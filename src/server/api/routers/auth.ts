import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { z } from "zod";
import Users from "@/server/api/models/users";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z
        .object({
          email: z.string().email("This is not a valid email."),
          name: z.string(),
          password: z.string().min(8, {
            message: "Password must be at least 8 characters long.",
          }),
          passwordConfirmation: z.string(),
        })
        .refine(
          ({ password, passwordConfirmation }) =>
            password === passwordConfirmation,
          {
            message: "Passwords do not match.",
          }
        )
    )
    .mutation(async ({ ctx, input }) => {
      return await Users(ctx.prisma.user).signup(input);
    }),
  getImage: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) throw new Error("User not found.");

    return user.image;
  }),
});
