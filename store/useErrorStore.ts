import { AppError, ApplicationError, ErrorType } from "@/types/errors";
import { create } from "zustand";

interface ErrorState {
  errors: AppError[];
  addError: (error: ApplicationError | Error) => void;
  removeError: (timestamp: Date) => void;
  clearErrors: () => void;
  hasErrors: boolean;
  lastError?: AppError;
}

export const useErrorStore = create<ErrorState>((set, get) => ({
  errors: [],
  hasErrors: false,
  lastError: undefined,

  addError: (error) =>
    set((state) => {
      const appError: AppError =
        error instanceof ApplicationError
          ? error.toJSON()
          : {
              type: ErrorType.UNKNOWN,
              message: error.message,
              timestamp: new Date(),
            };

      const newErrors = [...state.errors, appError];
      return {
        errors: newErrors,
        hasErrors: true,
        lastError: appError,
      };
    }),

  removeError: (timestamp) =>
    set((state) => ({
      errors: state.errors.filter((error) => error.timestamp !== timestamp),
      hasErrors: state.errors.length > 1,
      lastError: state.errors[state.errors.length - 1],
    })),

  clearErrors: () =>
    set({
      errors: [],
      hasErrors: false,
      lastError: undefined,
    }),
}));
