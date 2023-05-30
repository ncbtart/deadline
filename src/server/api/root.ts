import { createTRPCRouter } from "@/server/api/trpc";
import { echeanceRouter } from "@/server/api/routers/echeance";
import { personnelRouter } from "./routers/personnel";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  echeance: echeanceRouter,
  personnel: personnelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
