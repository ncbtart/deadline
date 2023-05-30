import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const personnelRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.personnel.findMany();
  }),
});
