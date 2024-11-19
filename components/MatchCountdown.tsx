import { formatDuration, intervalToDuration, isBefore } from "date-fns";
import React, { useEffect, useState } from "react";

// Fonction pour calculer le temps restant
export function afficherTempsRestant(
  dateFuture: Date,
  callback?: () => void
): string {
  const maintenant = new Date(); // Date actuelle
  const futureDate = new Date(dateFuture); // Convertir la chaîne en objet Date

  // Vérifier si la date future est dans le passé
  if (isBefore(futureDate, maintenant)) {
    if (callback) callback(); // Exécuter le callback si la date est passée
    return "La date est déjà passée";
  }

  // Calculer la durée entre maintenant et la date future
  const duration = intervalToDuration({
    start: maintenant,
    end: futureDate,
  });

  // Formater la durée avec formatDuration
  const formattedDuration = formatDuration(duration, {
    format: ["days", "hours", "minutes"],
    delimiter: " ",
    zero: false, // Exclure les unités à 0
  });

  // Ajouter le mot "Dans" avant la durée si elle n'est pas vide
  return formattedDuration
    ? `Dans ${customizeDuration(formattedDuration)}`
    : "Moins d'une minute";
}

// Fonction pour personnaliser les unités
function customizeDuration(duration: string): string {
  return duration
    .replace("days", "jours")
    .replace("day", "jour")
    .replace("hours", "h")
    .replace("minutes", "min");
}

// Composant React pour afficher le compte à rebours
interface MatchProps {
  betStartTime: Date;
  handleTimePasse?: () => void;
}

const MatchCountdown: React.FC<MatchProps> = ({
  betStartTime,
  handleTimePasse,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = afficherTempsRestant(betStartTime, () => {
        if (handleTimePasse) {
          handleTimePasse();
        } else {
          return "La date est déjà passée";
        }
      });
      setTimeRemaining(remainingTime);
    }, 1000); // Mise à jour chaque seconde

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [betStartTime]); // Le tableau de dépendances utilise `betStartTime`

  return <p>{timeRemaining}</p>;
};

export default MatchCountdown;
