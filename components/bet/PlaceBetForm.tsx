"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBet } from "@/hooks/useBet";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";

interface PlaceBetFormProps {
  matchId: number;
  matchDetails: {
    homeTeam: string;
    awayTeam: string;
    percentage: number;
    league: string;
    startTime: Date;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function PlaceBetForm({
  matchId,
  matchDetails,
  isOpen,
  onClose,
}: PlaceBetFormProps) {
  const [amount, setAmount] = useState("");
  const { placeBet, isPlacingBet } = useBet();
  const { balance } = useWallet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const betAmount = parseFloat(amount);
    
    if (isNaN(betAmount) || betAmount <= 0) {
      return;
    }

    placeBet(
      { matchId, amount: betAmount },
      {
        onSuccess: () => {
          setAmount("");
          onClose();
        },
      }
    );
  };

  const potentialWin = parseFloat(amount) * matchDetails.percentage;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Placer un pari</DialogTitle>
          <DialogDescription>
            {matchDetails.homeTeam} vs {matchDetails.awayTeam}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Montant du pari (XOF)</Label>
              <Input
                type="number"
                min="100"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Entrez le montant"
                className="col-span-3"
              />
              <p className="text-xs text-gray-500">
                Solde disponible: {balance || 0} XOF
              </p>
            </div>

            <div className="space-y-2">
              <Label>Détails du match</Label>
              <div className="text-sm space-y-1">
                <p>Ligue: {matchDetails.league}</p>
                <p>
                  Date: {new Date(matchDetails.startTime).toLocaleDateString("fr-FR")}
                </p>
                <p>Cote: {matchDetails.percentage}x</p>
                {amount && (
                  <p className="font-semibold text-green-600">
                    Gain potentiel: {potentialWin.toFixed(2)} XOF
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPlacingBet}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={
                isPlacingBet ||
                !amount ||
                parseFloat(amount) <= 0 ||
                parseFloat(amount) > (balance || 0)
              }
            >
              {isPlacingBet ? "Placement..." : "Placer le pari"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
