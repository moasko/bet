import { Bet } from "@prisma/client";
import { create } from "zustand";

interface BetState {
  bets: Bet[];
  activeBet: Bet | null;
  isLoading: boolean;
  error: string | null;
  setBets: (bets: Bet[]) => void;
  setActiveBet: (bet: Bet | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addBet: (bet: Bet) => void;
  updateBet: (bet: Bet) => void;
}

export const useBetStore = create<BetState>((set) => ({
  bets: [],
  activeBet: null,
  isLoading: false,
  error: null,
  setBets: (bets) => set({ bets }),
  setActiveBet: (bet) => set({ activeBet: bet }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addBet: (bet) => set((state) => ({ bets: [...state.bets, bet] })),
  updateBet: (updatedBet) =>
    set((state) => ({
      bets: state.bets.map((bet) =>
        bet.id === updatedBet.id ? updatedBet : bet
      ),
    })),
}));
