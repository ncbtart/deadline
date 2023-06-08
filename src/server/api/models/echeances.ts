import {
  type PrismaClient,
  type Echeance,
  type Typologie,
  type Note,
} from "@prisma/client";

type InputCreateEcheance = {
  date: Date;
  reference: string;
  typologie: Typologie;
  objet: string;
  echeance: Date;
  responsableId: string;
  note: Note;
  personnelsId: string[];
};

type InputUpdateEcheance = {
  id: string;
  date: Date;
  reference: string;
  typologie: Typologie;
  objet: string;
  echeance: Date;
  responsableId: string;
  note: Note;
  personnelsId: string[];
};

export default function Echeances(prismaEcheance: PrismaClient["echeance"]) {
  return Object.assign(prismaEcheance, {
    async createEcheance(data: InputCreateEcheance): Promise<Echeance> {
      const checkEcheance = await prismaEcheance.findFirst({
        where: {
          reference: data.reference,
        },
      });

      if (checkEcheance)
        throw new Error(
          "Une échéance avec cette référence existe déjà, veuillez en choisir une autre"
        );

      if (data.date > data.echeance)
        throw new Error(
          "Date de création de l'échéance doit être inférieure à la date d'échéance"
        );

      const echeance = await prismaEcheance.create({
        data: {
          date: data.date,
          reference: data.reference,
          typologie: data.typologie,
          objet: data.objet,
          echeance: data.echeance,
          note: data.note,
          responsable: {
            connect: {
              id: data.responsableId,
            },
          },
          echeancePersonnel: {
            createMany: {
              data: data.personnelsId.map((personnelId) => ({
                personnelId,
              })),
            },
          },
        },
      });

      return echeance;
    },

    async updateEcheance(data: InputUpdateEcheance): Promise<Echeance> {
      const checkEcheance = await prismaEcheance.findFirst({
        where: {
          reference: data.reference,
        },
      });

      if (checkEcheance && checkEcheance.id !== data.id)
        throw new Error(
          "Une échéance avec cette référence existe déjà, veuillez en choisir une autre"
        );

      if (data.date > data.echeance)
        throw new Error(
          "Date de création de l'échéance doit être inférieure à la date d'échéance"
        );

      const echeance = await prismaEcheance.update({
        where: {
          id: data.id,
        },
        data: {
          date: data.date,
          reference: data.reference,
          typologie: data.typologie,
          objet: data.objet,
          echeance: data.echeance,
          note: data.note,
          echeancePersonnel: {
            deleteMany: {},
            createMany: {
              data: data.personnelsId.map((personnelId) => ({
                personnelId,
              })),
            },
          },
        },
      });

      return echeance;
    },
  });
}
