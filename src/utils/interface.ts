import {
  type Echeance,
  type User,
  type EcheancePersonnel,
} from "@prisma/client";

export type EcheancheWithResponsable = Echeance & {
  responsable: UserWithoutPassword;
};

export type EcheancePersonnelWithPersonnel = EcheancePersonnel & {
  personnel: UserWithoutPassword;
};

export type EcheancheWithPersonnel = Echeance & {
  responsable: UserWithoutPassword;
  echeancePersonnel: EcheancePersonnelWithPersonnel[];
};

export type UserWithoutPassword = Omit<User, "password" | "emailVerified">;
