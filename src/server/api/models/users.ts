import { type PrismaClient, type User } from "@prisma/client";

import fs from "fs";

import argon2 from "argon2";

type Signup = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export default function Users(prismaUser: PrismaClient["user"]) {
  return Object.assign(prismaUser, {
    async signup(data: Signup): Promise<User> {
      const user = await prismaUser.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user) throw new Error("User already exists.");

      const hashedPassword = await argon2.hash(data.password);

      return await prismaUser.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });
    },
    async uploadImage(
      data: { image: File },
      responsableId: string
    ): Promise<User> {
      const user = await prismaUser.findUnique({
        where: {
          id: responsableId,
        },
      });

      if (!user) throw new Error("Aucun utilisateur trouvé.");

      const { image } = data;

      const reader = new FileReader();

      reader.readAsDataURL(image);

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          // save in public folder and remove from tmp folder

          const buffer = reader.result as string;

          if (!buffer) throw new Error("No base64 found.");

          const base64 = buffer.replace(/^data:.+;base64,/, "");

          const path = `public/img/profile/${user.id}.png`;

          fs.writeFile(path, base64, "base64", (err) => {
            if (err) reject(err);

            prismaUser
              .update({
                where: {
                  id: user.id,
                },
                data: {
                  image: path,
                },
              })
              .then((user) => {
                resolve(user);
              })
              .catch((err) => {
                reject(err);
              });
          });
        };

        reader.onerror = (error) => {
          reject(error);
        };
      });
    },
  });
}
