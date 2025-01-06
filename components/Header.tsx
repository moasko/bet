"use client";

import { Button } from "@/components/ui/button";
import { useHeader } from "@/hooks/useHeader";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function Header() {
  const { isAuthenticated, isLoading, user, balance } = useHeader();

  if (isLoading) {
    return <div className="h-16 bg-background border-b animate-pulse" />;
  }

  return (
    <header className="h-16 bg-background border-b">
      <div className="container h-full mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          BetApp
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Solde:</span>
                <span className="font-medium">
                  {balance.toLocaleString("fr-FR")} €
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Déconnexion
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Inscription</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
