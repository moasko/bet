import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'

interface WalletState {
  balance: number;
  isLoading: boolean;
  error: string | null;
  setBalance: (balance: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 0,
      isLoading: false,
      error: null,
      setBalance: (balance) => set({ balance }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
