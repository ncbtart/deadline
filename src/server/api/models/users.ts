import { type PrismaClient, type User } from "@prisma/client";

import argon2 from "argon2";

type Signup = {
  email: string;
  firstname: string;
  lastname: string;
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
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: hashedPassword,
        },
      });
    },
  });
}
