import { useCurrentUser } from "@/hooks/use-current-user";
import { useWallet } from "@/hooks/useWallet";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useProfile = () => {
  const user = useCurrentUser();
  const { balance, isLoading: isLoadingBalance } = useWallet();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  return {
    user,
    balance,
    isLoading: status === "loading" || isLoadingBalance,
    isAuthenticated: status === "authenticated",
  };
};
