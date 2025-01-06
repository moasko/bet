"use client";

import { UserSyncProvider } from "@/components/providers/UserSyncProvider";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Set default stale time
      },
    },
  });
}

let browserQueryClient: QueryClient;

function getQueryClient() {
  if (typeof window === "undefined") {
    // En environnement serveur
    return makeQueryClient();
  } else {
    // En environnement client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <UserSyncProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </UserSyncProvider>
    </SessionProvider>
  );
}
