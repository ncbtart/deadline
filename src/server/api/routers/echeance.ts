import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const echeanceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.echeance.findMany({});
  }),
});
