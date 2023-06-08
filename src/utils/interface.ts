import {
  type Echeance,
  type User,
  type EcheancePersonnel,
  type Personnel,
} from "@prisma/client";

export type EcheancheWithResponsable = Echeance & {
  responsable: User;
};

export type EcheancePersonnelWithPersonnel = EcheancePersonnel & {
  personnel: Personnel;
};

export type EcheancheWithPersonnel = Echeance & {
  echeancePersonnel: EcheancePersonnelWithPersonnel[];
};
