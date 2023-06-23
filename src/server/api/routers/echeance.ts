import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Note, StatusEcheance, Typologie } from "@prisma/client";
import { z } from "zod";

import Echeances from "@/server/api/models/echeances";

export const echeanceRouter = createTRPCRouter({
  findAll: protectedProcedure
    .input(
      z.object({
        filter: z.string().optional(),
        sort: z
          .object({
            name: z.string(),
            order: z.enum(["asc", "desc"]),
          })
          .optional(),
        page: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let orderBy;
      let skip = 0;

      const take = 10;

      if (input?.sort)
        if (input?.sort?.name === "responsable") {
          orderBy = {
            responsable: {
              name: input?.sort?.order,
            },
          };
        } else {
          orderBy = {
            [input?.sort?.name]: input?.sort?.order,
          };
        }

      if (input?.page) {
        skip = input?.page * take - take;
      }

      const total = await ctx.prisma.echeance.count({
        where: {
          OR: [
            {
              responsable: {
                id: ctx.session.user.id,
              },
            },
            {
              echeancePersonnel: {
                some: {
                  personnelId: ctx.session.user.id,
                },
              },
              datePersonnels: {
                not: null,
              },
            },
          ],
          AND: [
            {
              OR: [
                {
                  title: {
                    contains: input?.filter,
                  },
                },
                {
                  reference: {
                    contains: input?.filter,
                  },
                },
                {
                  responsable: {
                    name: {
                      contains: input?.filter,
                    },
                  },
                },
                {
                  echeancePersonnel: {
                    some: {
                      personnel: {
                        name: {
                          contains: input?.filter,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      });

      const data = await ctx.prisma.echeance.findMany({
        take,
        skip,
        where: {
          OR: [
            {
              responsable: {
                id: ctx.session.user.id,
              },
            },
            {
              echeancePersonnel: {
                some: {
                  personnelId: ctx.session.user.id,
                },
              },
              datePersonnels: {
                not: null,
              },
            },
          ],
          AND: [
            {
              OR: [
                {
                  title: {
                    contains: input?.filter,
                  },
                },
                {
                  reference: {
                    contains: input?.filter,
                  },
                },
                {
                  responsable: {
                    name: {
                      contains: input?.filter,
                    },
                  },
                },
                {
                  echeancePersonnel: {
                    some: {
                      personnel: {
                        name: {
                          contains: input?.filter,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        orderBy,
        include: {
          responsable: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          echeancePersonnel: {
            include: {
              personnel: {
                select: {
                  id: true,
                  name: true,

                  email: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      return {
        totalPages: Math.ceil(total / take),
        data,
      };
    }),
  findById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input) throw new Error("Aucune échéance trouvée");

      return await Echeances(ctx.prisma.echeance).findById(
        input.id,
        ctx.session.user.id
      );
    }),

  createEcheance: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        title: z.string(),
        reference: z.string(),
        typologie: z.nativeEnum(Typologie),
        objet: z.string(),
        echeance: z.date(),
        note: z.nativeEnum(Note),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responsableId = ctx.session.user.id;

      return await Echeances(ctx.prisma.echeance).createEcheance({
        ...input,
        responsableId,
      });
    }),
  updateEcheance: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date(),
        reference: z.string(),
        typologie: z.nativeEnum(Typologie),
        objet: z.string(),
        echeance: z.date(),
        note: z.nativeEnum(Note),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responsableId = ctx.session.user.id;

      return await Echeances(ctx.prisma.echeance).updateEcheance({
        ...input,
        responsableId,
      });
    }),

  deleteEcheance: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const responsableId = ctx.session.user.id;

      return await Echeances(ctx.prisma.echeance).deleteEcheance({
        ...input,
        responsableId,
      });
    }),

  initReponse: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        datePersonnels: z.date(),
        personnelsId: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responsableId = ctx.session.user.id;

      return await Echeances(ctx.prisma.echeance).initReponse({
        ...input,
        responsableId,
      });
    }),

  updateReponse: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(StatusEcheance),
        dateRealisation: z.date().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await Echeances(ctx.prisma.echeance).updateReponse({
        ...input,
        userId,
      });
    }),
});
