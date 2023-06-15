import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Note, StatusEcheance, Typologie } from "@prisma/client";
import { z } from "zod";

import Echeances from "@/server/api/models/echeances";

export const echeanceRouter = createTRPCRouter({
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.echeance.findMany({
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
      },
      orderBy: {
        echeance: "asc",
      },
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
  }),
  findById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input) throw new Error("Aucune échéance trouvée");

      return await ctx.prisma.echeance.findUnique({
        where: {
          id: input.id,
        },
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
    }),

  createEcheance: protectedProcedure
    .input(
      z.object({
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
