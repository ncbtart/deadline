import * as formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/server/auth";

import { getServerSession } from "next-auth/next";

import { prisma } from "@/server/db";

export const config = {
  api: {
    bodyParser: false, // Désactive le corps d'analyse automatique de Next.js
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Méthode non autorisée" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Vous n'êtes pas connecté" });
    return;
  }

  const form = new formidable.IncomingForm({
    keepExtensions: true,
  });

  form.parse(
    req,
    (err, fields, files) =>
      void (async () => {
        if (err) {
          res
            .status(500)
            .json({ message: "Erreur lors de l'analyse du formulaire" });
          return;
        }

        const uploadedFiles: formidable.Files = files;

        const image = uploadedFiles.image as formidable.File[];

        if (!image[0]) {
          res.status(400).json({ message: "Aucune image n'a été téléchargée" });
          return;
        }

        const extension = image[0].originalFilename?.split(".").pop();

        // Vérifie la taille du fichier
        if (image[0].size > 1024 * 1024) {
          res
            .status(400)
            .json({ message: "La taille de l'image est trop grande" });
          return;
        }

        try {
          // Crée un nouveau blob à partir du fichier image
          // const blob = await createBlob(image[0].path);

          // Définit le chemin de destination dans Vercel Blob
          // const newPath = `public/img/profile/${session.user.id}.${
          //   extension || "png"
          // }`;

          // Déplace le blob vers le nouveau chemin d'accès avec le nouveau nom
          // await blob.moveTo(newPath);

          await prisma.user.update({
            where: {
              id: session.user.id,
            },
            data: {
              image: `/img/profile/${session.user.id}.${extension || "png"}`,
            },
          });

          res.status(200).json({ message: "Image téléchargée avec succès" });
        } catch (error) {
          console.error("Erreur lors du stockage de l'image :", error);
          res
            .status(500)
            .json({ message: "Erreur lors de l'enregistrement de l'image" });
        }
      })()
  );
}
