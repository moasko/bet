import { useWallet } from "@/hooks/useWallet";
import { handleApiError } from "@/lib/error-handler";
import { useAuthStore } from "@/store/useAuthStore";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";

export const useUserSync = () => {
  const { data: session, status } = useSession();
  const { setUser } = useAuthStore();
  const { fetchBalance } = useWallet();
  const initialSyncDone = useRef(false);

  const syncUserData = useCallback(async () => {
    if (
      status === "authenticated" &&
      session?.user &&
      !initialSyncDone.current
    ) {
      try {
        // Mettre à jour le store auth avec les données de session
        setUser({
          id: Number(session.user.id),
          name: session.user.name ?? undefined,
          email: session.user.email ?? undefined,
          role: session.user.role ?? undefined,
          status: session.user.status ?? undefined,
          permissions: session.user.permissions ?? undefined,
        });

        // Récupérer le solde du wallet
        await fetchBalance();
        initialSyncDone.current = true;
      } catch (error) {
        handleApiError(error, "useUserSync");
      }
    } else if (status === "unauthenticated") {
      initialSyncDone.current = false;
    }
  }, [session?.user, status, setUser, fetchBalance]);

  useEffect(() => {
    syncUserData();
  }, [syncUserData]);

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};
