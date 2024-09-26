"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleMinus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subtractSolde } from "@/back/user"; // Assurez-vous d'avoir cette fonction définie dans votre backend.
import { toast } from "sonner";

function SubtractSoldeButton({ user_id }: { user_id: number }) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");

  const subtractSoldeMutation = useMutation({
    mutationFn: (solde: number) => subtractSolde(user_id, solde),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["userAnalytics"],
      });
    },
    onSuccess: () => {
      toast.success("Solde soustrait avec succès.", {
        description: "Le solde a été mis à jour avec succès.",
        action: {
          label: "Undo",
          onClick: () => console.log("Annulation"),
        },
      });
      setAmount("");
    },
    onError: () => {
      toast.error("Erreur lors de la soustraction du solde.", {
        description:
          "Un problème est survenu lors de la soustraction du solde.",
      });
    },
  });

  const handleSubmit = () => {
    const solde = Number(amount);
    if (isNaN(solde) || solde <= 0) {
      alert("Veuillez entrer un montant valide.");
      return;
    }
    subtractSoldeMutation.mutate(solde);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-500 space-x-3">
          <CircleMinus size={16} />
          <span>Solde</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Soustraire le solde</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="solde" className="text-right">
              Solde
            </Label>
            <Input
              type="number"
              id="solde"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="Entrez le montant à soustraire"
            />
          </div>
          <div>
            <Label htmlFor="remarque" className="text-right">
              Remarque
            </Label>
            <Textarea id="remarque" placeholder="Tapez votre message ici." />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={subtractSoldeMutation.isPending}
            onClick={handleSubmit}
          >
            {subtractSoldeMutation.isPending ? "En cours..." : "Soustraire"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubtractSoldeButton;
