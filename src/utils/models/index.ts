import type { Note, StatusEcheance, Typologie } from "@prisma/client";

export interface Echeance {
  id: string;
  date: Date;
  status: StatusEcheance;
  reference: string;
  typologie: Typologie;
  objet: string;
  echeance: Date;
  responsable: User;
  note: Note;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}
