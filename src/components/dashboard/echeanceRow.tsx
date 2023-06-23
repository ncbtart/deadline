import { type EcheanceWithPersonnel } from "@/utils/interface";
import { useRouter } from "next/router";
import { Avatar, TableCell, TableRow } from "@/components/core";
import { format } from "date-fns";
import Status from "./status";
import EcheanceDisplay from "./echeance";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

interface EcheanceRowProps {
  echeance: EcheanceWithPersonnel;
}

function calculerPourcentageEcheance(dateDebut: Date, dateFin: Date) {
  const dateActuelle = new Date();

  if (dateActuelle < dateDebut) {
    return "0"; // Le pourcentage est de 0% car l'échéance n'a pas encore commencé
  }

  if (dateActuelle > dateFin) {
    return "100"; // Le pourcentage est de 100% car l'échéance est terminée
  }

  // Calculer la durée totale en millisecondes entre la date de début et la date de fin
  const dureeTotale = dateFin.getTime() - dateDebut.getTime();

  // Calculer la durée écoulée en millisecondes entre la date de début et la date actuelle
  const dureeEcoulee = dateActuelle.getTime() - dateDebut.getTime();

  // Calculer le pourcentage d'échéance en divisant la durée écoulée par la durée totale et en multipliant par 100
  const pourcentageEcheance = (dureeEcoulee / dureeTotale) * 100;

  if (pourcentageEcheance < 10) {
    return "15";
  }

  return pourcentageEcheance.toFixed();
}

function calculerEcheance(dateDebut: Date, dateFin: Date) {
  const dateActuelle = new Date();

  if (dateActuelle < dateDebut) {
    return "N'à pas encore commencé";
  }

  // Vérifier si la date actuelle est après la date de fin
  if (dateActuelle > dateFin) {
    return "L'échéance est terminée.";
  }

  const dureeRestante = dateFin.getTime() - dateActuelle.getTime(); // Durée totale en millisecondes

  const heuresEcoulees = Math.floor(dureeRestante / (1000 * 60 * 60)); // Conversion en heures entières
  const joursEcoules = Math.floor(dureeRestante / (1000 * 60 * 60 * 24)); // Conversion en jours entiers
  const moisEcoules = Math.floor(joursEcoules / 30); // Conversion en mois (en considérant 30 jours par mois)

  if (moisEcoules === 0) {
    if (joursEcoules === 0) {
      return `${heuresEcoulees} heures restantes`;
    }
    if (joursEcoules === 1) {
      return `${joursEcoules} jour restant`;
    }
    return `${joursEcoules} jours restants`;
  }

  if (moisEcoules === 1) {
    return `${moisEcoules} mois restant`;
  }

  return `${moisEcoules} mois restant(s)`;
}

export function EcheanceRow({ echeance }: EcheanceRowProps) {
  const router = useRouter();

  const { data: session } = useSession();

  const status = useMemo(() => {
    if (session?.user.id === echeance.responsable.id) return echeance?.status;

    if (echeance.datePersonnels)
      return echeance?.echeancePersonnel.find(
        (e) => e.personnel.id === session?.user.id
      )?.status;

    return echeance?.status;
  }, [echeance, session]);

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => void router.push("/echeance/" + echeance.id)}
      >
        <TableCell>
          <p className="max-w-xs truncate">{echeance.title}</p>
        </TableCell>
        <TableCell>
          <Avatar
            tooltip
            name={`${echeance.responsable.name as string}`}
            image={echeance.responsable?.image}
          />
        </TableCell>
        <TableCell>{echeance.reference}</TableCell>
        <TableCell>{format(echeance.date, "dd/MM/yy")}</TableCell>
        <TableCell>{echeance.typologie}</TableCell>
        <TableCell>
          {session?.user.id === echeance.responsable.id && (
            <EcheanceDisplay
              message={calculerEcheance(echeance.date, echeance.echeance)}
              pourcentage={calculerPourcentageEcheance(
                echeance.date,
                echeance.echeance
              )}
              status={status}
            />
          )}
        </TableCell>
        <TableCell>
          {echeance.datePersonnels && (
            <EcheanceDisplay
              message={calculerEcheance(echeance.date, echeance.datePersonnels)}
              pourcentage={calculerPourcentageEcheance(
                echeance.date,
                echeance.datePersonnels
              )}
              status={status}
            />
          )}
        </TableCell>
        <TableCell>
          <Status status={status} />
        </TableCell>
      </TableRow>
    </>
  );
}
