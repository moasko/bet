import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Enum for currency symbols
enum Symboles {
  XOF = "XOF",
  USD = "USD",
}

interface CurrencysSymbolProps {
  amount: number;
  symbole: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyToXOF = (amount: number = 0): string => {
  return `${amount} XOF`;
};

export const currentcyChange = (
  { amount, symbole }: CurrencysSymbolProps = {
    amount: 0,
    symbole: Symboles.XOF,
  }
): string => {
  switch (symbole) {
    case Symboles.XOF:
      return `${amount} XOF`;
    case Symboles.USD:
      const convertedAmount = (amount / 635).toFixed(2);
      return `${convertedAmount} USD`;
    default:
      return `${amount}`;
  }
};

export const formatResult = (
  result: string
): { homeTeamResult: number; awayTeamResult: number } | null => {
  if (!result || !result.includes("-")) {
    return null;
  }

  const [home, away] = result.split("-").map(Number);
  if (isNaN(home) || isNaN(away)) {
    return null;
  }

  return {
    homeTeamResult: home,
    awayTeamResult: away,
  };
};

export const generateReferralCode = (length: number) => {
  if (length <= 0) {
    throw new Error("Referral code length must be a positive number");
  }

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
};

export const cu = (amount: number, selectedCurrency: string): number => {
  const exchangeRate = 650;

  if (selectedCurrency === "USD") {
    return amount / exchangeRate; // Conversion en USD
  }

  return amount; // Retourne le montant en XOF si la devise est XOF
};
