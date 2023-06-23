import {
  type Echeance,
  type User,
  type EcheancePersonnel,
} from "@prisma/client";

export type EcheanceWithResponsable = Echeance & {
  responsable: UserWithoutPassword;
};

export type EcheancePersonnelWithPersonnel = EcheancePersonnel & {
  personnel: UserWithoutPassword;
};

export type EcheanceWithPersonnel = Echeance & {
  responsable: UserWithoutPassword;
  echeancePersonnel: EcheancePersonnelWithPersonnel[];
};

export type UserWithoutPassword = Omit<User, "password" | "emailVerified">;
