"use client";

import { useUserSync } from "@/hooks/useUserSync";
import { StoreHydration } from "./StoreHydration";

interface UserSyncProviderProps {
  children: React.ReactNode;
}

export function UserSyncProvider({ children }: UserSyncProviderProps) {
  // Ce hook va gérer automatiquement la synchronisation
  useUserSync();

  return (
    <>
      <StoreHydration />
      {children}
    </>
  );
}
