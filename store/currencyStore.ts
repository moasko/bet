import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CurrencyState {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency: string) => set({ currency }),
    }),
    {
      name: "currency",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
