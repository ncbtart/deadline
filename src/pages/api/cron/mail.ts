import type { NextApiRequest, NextApiResponse } from "next";

import nodemailer from "nodemailer";

import { prisma } from "src/server/db";

import { format } from "date-fns";

import {
  type Echeance,
  type EcheancePersonnel,
  StatusEcheance,
} from "@prisma/client";

async function sendReminderEmail(
  echeance: Echeance & {
    echeancePersonnel: (EcheancePersonnel & {
      personnel: {
        name: string | null;
        email: string | null;
      };
    })[];
    responsable: {
      name: string | null;
    };
  },
  personnel: {
    name: string | null;
    email: string | null;
  }
) {
  // Code pour envoyer un e-mail de rappel
  // Utilisez une bibliothèque comme nodemailer pour envoyer l'e-mail
  if (!echeance?.datePersonnels) return;

  try {
    const testAccount = await nodemailer.createTestAccount();
    // Configurer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Préparer les informations de l'e-mail
    const mailOptions = {
      from: "deadline@example.com", // Adresse e-mail de l'expéditeur
      to: personnel.email || "", // Adresse e-mail du destinataire
      subject: "Rappel de tâche", // Objet de l'e-mail
      text: `
      Bonjour ${personnel.name || ""},

      Pour rappel : la tâche "${echeance.title}" attribué par ${
        echeance.responsable.name || ""
      } doit être terminée le ${format(echeance?.datePersonnels, "dd/MM/yyyy")}

      Ne pas répondre.`, // Contenu du message
    };

    if (!personnel?.email) throw new Error("Aucun email pour cet user");

    // Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé:", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    // Récupérer les tâches avec échéance proche depuis la base de données
    const currentDate = new Date();

    const echeances = await prisma.echeance.findMany({
      where: {
        datePersonnels: {
          gte: currentDate,
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
        echeancePersonnel: {
          some: {
            OR: [
              {
                status: {
                  equals: StatusEcheance.A_FAIRE,
                },
              },
              {
                status: {
                  equals: StatusEcheance.EN_COURS,
                },
              },
            ],
          },
        },
      },
      include: {
        echeancePersonnel: {
          where: {
            OR: [
              {
                status: {
                  equals: StatusEcheance.A_FAIRE,
                },
              },
              {
                status: {
                  equals: StatusEcheance.EN_COURS,
                },
              },
            ],
          },
          include: {
            personnel: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
        responsable: {
          select: {
            name: true,
          },
        },
      },
    });

    // Envoyer un e-mail de rappel pour chaque tâche
    await Promise.all(
      echeances.flatMap((e) =>
        e.echeancePersonnel.map((ep) => sendReminderEmail(e, ep.personnel))
      )
    );
  } catch (error) {
    console.error("Erreur lors de la tâche cron :", error);
  }

  response.status(200).json({ success: true });
}
