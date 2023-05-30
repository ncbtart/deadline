import { Progress } from "../core";

interface EcheanceProps {
  dateDebut: Date;
  dateFin: Date;
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
    return "L'échéance n'a pas encore commencé.";
  }

  // Vérifier si la date actuelle est après la date de fin
  if (dateActuelle > dateFin) {
    return "L'échéance est terminée.";
  }

  const dureeRestante = dateFin.getTime() - dateActuelle.getTime(); // Durée totale en millisecondes

  const joursEcoules = Math.floor(dureeRestante / (1000 * 60 * 60 * 24)); // Conversion en jours entiers
  const moisEcoules = Math.floor(joursEcoules / 30); // Conversion en mois (en considérant 30 jours par mois)

  if (moisEcoules === 0) {
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

export default function Echeance({ dateDebut, dateFin }: EcheanceProps) {
  const pourcentageEcheance = calculerPourcentageEcheance(dateDebut, dateFin);

  return (
    <div className="flex w-40 flex-col">
      <Progress value={pourcentageEcheance} color="green" />
      <p className="text-center text-[9px] font-medium uppercase text-gray-500">
        {calculerEcheance(dateDebut, dateFin)}
      </p>
    </div>
  );
}
