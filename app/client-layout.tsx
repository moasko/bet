"use client";

import { UserSyncProvider } from "@/components/providers/UserSyncProvider";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserSyncProvider>
      {children}
      <ErrorDisplay />
    </UserSyncProvider>
  );
}
