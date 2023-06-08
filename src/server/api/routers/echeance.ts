import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Note, Typologie } from "@prisma/client";
import { z } from "zod";

import Echeances from "@/server/api/models/echeances";

export const echeanceRouter = createTRPCRouter({
  findAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.echeance.findMany({
      include: {
        responsable: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
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
        personnelsId: z.array(z.string()),
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
        personnelsId: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const responsableId = ctx.session.user.id;

      return await Echeances(ctx.prisma.echeance).updateEcheance({
        ...input,
        responsableId,
      });
    }),
});
