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

export const currentChange = (
  amount: number = 0,
  symbole: Symboles
): string => {
  switch (symbole) {
    case Symboles.XOF:
      return `${amount} XOF`;
    case Symboles.USD:
      const convertedAmount = (amount * 0.0017).toFixed(2);
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
