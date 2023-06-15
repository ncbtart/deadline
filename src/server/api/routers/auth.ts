import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { z } from "zod";
import Users from "@/server/api/models/users";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
  uploadImage: protectedProcedure
    .input(
      z.object({
        image: z
          .instanceof(File)
          .refine((file: File) => {
            if (!file || !file.size) return false;
            return file.size >= MAX_FILE_SIZE;
          }, "Image is too large.") // this should be greater than or equals (>=) not less that or equals (<=)
          .refine((file) => {
            if (!file || !file.type) return false;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
          }, ".jpg, .jpeg, .png and .webp files are accepted."),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responsableId = ctx.session.user.id;

      console.log(input);

      return await Users(ctx.prisma.user).uploadImage(input, responsableId);
    }),
});
