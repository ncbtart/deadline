import type { EcheanceWithPersonnel } from "@/utils/interface";
import {
  type PrismaClient,
  type Echeance,
  type Typologie,
  type Note,
  type StatusEcheance,
} from "@prisma/client";

type InputCreateEcheance = {
  date: Date;
  title: string;
  reference: string;
  typologie: Typologie;
  objet: string;
  echeance: Date;
  responsableId: string;
  note: Note;
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
};

type InputInitReponse = {
  id: string;
  datePersonnels: Date;
  responsableId: string;
  personnelsId: string[];
};

type InputDeleteEcheance = {
  id: string;
  responsableId: string;
};

type InputUpdateReponse = {
  id: string;
  status: StatusEcheance;
  dateRealisation?: Date;
  userId: string;
  message?: string;
};

export default function Echeances(prismaEcheance: PrismaClient["echeance"]) {
  return Object.assign(prismaEcheance, {
    async findById(
      id: string,
      responsableId: string
    ): Promise<EcheanceWithPersonnel | null> {
      const echeance = await prismaEcheance.findUnique({
        where: {
          id,
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

      if (!echeance) throw new Error("Aucune échéance trouvée");

      if (
        echeance.responsable.id !== responsableId &&
        !echeance?.echeancePersonnel.find(
          (echeancePersonnel) =>
            echeancePersonnel.personnel.id === responsableId
        )
      )
        throw new Error("Vous n'êtes pas autorisé à voir cette échéance");

      return echeance;
    },

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

      return await prismaEcheance.create({
        data: {
          date: data.date,
          title: data.title,
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
    },

    async updateEcheance(data: InputUpdateEcheance): Promise<Echeance> {
      if (data.date > data.echeance)
        throw new Error(
          "Date de création de l'échéance doit être inférieure à la date d'échéance"
        );

      const checkEcheance = await prismaEcheance.findFirst({
        where: {
          id: data.id,
        },
        select: {
          responsable: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!checkEcheance) throw new Error("Aucune échéance trouvée");

      if (checkEcheance?.responsable.id !== data.responsableId) {
        throw new Error("Vous n'êtes pas responsable de cette échéance");
      }

      return await prismaEcheance.update({
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
        },
      });
    },

    async deleteEcheance(data: InputDeleteEcheance): Promise<Echeance> {
      const echeance = await prismaEcheance.findUnique({
        where: {
          id: data.id,
        },
        select: {
          responsable: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!echeance) throw new Error("Aucune échéance trouvée");

      if (echeance.responsable.id !== data.responsableId) {
        throw new Error("Vous n'êtes pas responsable de cette échéance");
      }

      await prismaEcheance.update({
        where: {
          id: data.id,
        },
        data: {
          echeancePersonnel: {
            deleteMany: {},
          },
        },
      });

      return await prismaEcheance.delete({
        where: {
          id: data.id,
        },
      });
    },

    async initReponse(data: InputInitReponse): Promise<Echeance> {
      console.log("INIT REPONSE");

      const echeance = await prismaEcheance.findUnique({
        where: {
          id: data.id,
        },
        include: {
          responsable: {
            select: {
              id: true,
            },
          },
          echeancePersonnel: {
            include: {
              personnel: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (!echeance) throw new Error("Aucune échéance trouvée");

      if (echeance.responsable.id !== data.responsableId) {
        throw new Error("Vous n'êtes pas responsable de cette échéance");
      }

      // create new echeancePersonnel if not exist and delete if not in data.personnelsId
      return await prismaEcheance.update({
        where: {
          id: data.id,
        },
        data: {
          datePersonnels: data.datePersonnels,
          echeancePersonnel: {
            deleteMany: {
              personnelId: {
                notIn: data.personnelsId,
              },
            },
            createMany: {
              skipDuplicates: true,
              data: data.personnelsId.map((personnelId) => {
                return {
                  personnelId,
                };
              }),
            },
          },
        },
        include: {
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
    },

    async updateReponse(data: InputUpdateReponse): Promise<Echeance> {
      const echeance = await prismaEcheance.findUnique({
        where: {
          id: data.id,
        },
        include: {
          echeancePersonnel: {
            where: {
              personnelId: data.userId,
            },
            include: {
              personnel: true,
            },
          },
        },
      });

      if (
        data.dateRealisation &&
        data.dateRealisation > (echeance?.echeance as Date)
      ) {
        throw new Error(
          "Date de réalisation de l'échéance doit être inférieure à la date d'échéance"
        );
      }

      if (
        data.dateRealisation &&
        data.dateRealisation < (echeance?.date as Date)
      ) {
        throw new Error(
          "Date de réalisation de l'échéance doit être supérieure à la date de création"
        );
      }

      if (!echeance) throw new Error("Aucune échéance trouvée");

      if (echeance.echeancePersonnel.length === 0) {
        throw new Error("Vous n'êtes pas concerné par cette échéance");
      }

      return await prismaEcheance.update({
        where: {
          id: data.id,
        },
        data: {
          echeancePersonnel: {
            update: {
              where: {
                echeanceId_personnelId: {
                  echeanceId: data.id,
                  personnelId: data.userId,
                },
              },
              data: {
                status: data.status,
                dateRealisation: data.dateRealisation,
                message: data.message,
              },
            },
          },
        },
      });
    },
  });
}
