import { getUserWalletBalance } from "@/actions/user";
import { createWalletError, handleApiError } from "@/lib/error-handler";
import { useAuthStore } from "@/store/useAuthStore";
import { useWalletStore } from "@/store/useWalletStore";
import { useCallback } from "react";

export const useWallet = () => {
  const { setBalance, setLoading } = useWalletStore();
  const userId = useAuthStore((state) => state.user?.id);

  const fetchBalance = useCallback(async () => {
    if (!userId) {
      throw createWalletError("User not connected", "WAL_001", { userId });
    }

    setLoading(true);

    try {
      const wallet = await getUserWalletBalance(userId);

      if (!wallet) {
        throw createWalletError("Wallet not found", "WAL_002", { userId });
      }

      setBalance(wallet.balance);
    } catch (error) {
      handleApiError(error, "fetchBalance");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [userId, setBalance, setLoading]);

  const balance = useWalletStore((state) => state.balance);
  const isLoading = useWalletStore((state) => state.isLoading);

  return {
    fetchBalance,
    balance,
    isLoading,
  };
};
