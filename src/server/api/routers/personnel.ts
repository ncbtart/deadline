import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const personnelRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        filter: z.string().optional(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findMany({
        where: {
          id: {
            notIn: input?.ids,
          },
          name: {
            contains: input?.filter,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });
    }),
});
