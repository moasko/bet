import { useErrorStore } from "@/store/useErrorStore";
import { ApplicationError, ErrorType } from "@/types/errors";

export const handleApiError = (
  error: unknown,
  context: string
): ApplicationError => {
  console.error(`Error in ${context}:`, error);

  if (error instanceof ApplicationError) {
    useErrorStore.getState().addError(error);
    return error;
  }

  let appError: ApplicationError;

  if (error instanceof Error) {
    // Determine error type based on error message or name
    if (
      error.message.includes("unauthorized") ||
      error.message.includes("not authenticated")
    ) {
      appError = new ApplicationError(
        ErrorType.AUTHENTICATION,
        "Vous devez être connecté pour effectuer cette action",
        "AUTH_001"
      );
    } else if (
      error.message.includes("permission") ||
      error.message.includes("forbidden")
    ) {
      appError = new ApplicationError(
        ErrorType.AUTHORIZATION,
        "Vous n'avez pas les permissions nécessaires",
        "AUTH_002"
      );
    } else if (error.message.includes("validation")) {
      appError = new ApplicationError(
        ErrorType.VALIDATION,
        "Les données fournies sont invalides",
        "VAL_001"
      );
    } else if (
      error.message.includes("network") ||
      error.message.includes("fetch")
    ) {
      appError = new ApplicationError(
        ErrorType.NETWORK,
        "Erreur de connexion au serveur",
        "NET_001"
      );
    } else {
      appError = new ApplicationError(
        ErrorType.UNKNOWN,
        "Une erreur inattendue est survenue",
        "UNK_001"
      );
    }
  } else {
    appError = new ApplicationError(
      ErrorType.UNKNOWN,
      "Une erreur inattendue est survenue",
      "UNK_002"
    );
  }

  useErrorStore.getState().addError(appError);
  return appError;
};

export const createWalletError = (
  message: string,
  code: string,
  data?: any
): ApplicationError => {
  return new ApplicationError(ErrorType.WALLET, message, code, data);
};

export const createBetError = (
  message: string,
  code: string,
  data?: any
): ApplicationError => {
  return new ApplicationError(ErrorType.BET, message, code, data);
};

export const createValidationError = (
  message: string,
  data?: any
): ApplicationError => {
  return new ApplicationError(ErrorType.VALIDATION, message, "VAL_001", data);
};
