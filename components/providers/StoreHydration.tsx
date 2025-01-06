"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useWalletStore } from "@/store/useWalletStore";
import { useEffect, useState } from "react";

export function StoreHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await Promise.all([
        useAuthStore.persist.rehydrate(),
        useWalletStore.persist.rehydrate()
      ]);
      setIsHydrated(true);
    };

    hydrate();
  }, []);

  if (!isHydrated) {
    return null;
  }

  return null;
}
