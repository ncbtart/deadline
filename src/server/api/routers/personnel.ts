import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const personnelRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.personnel.findMany();
  }),
});
