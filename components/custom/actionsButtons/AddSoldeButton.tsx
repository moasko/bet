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
import { addSolde } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function AddSoldeButton({ user_id }: { user_id: number }) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");

  const addSoldeMutation = useMutation({
    mutationFn: (solde: number) => addSolde(user_id, solde),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["userAnalytics"],
      });
    },
    onSuccess: () => {
      toast.info("Solde ajouté avec succès.", {
        description: "Le solde a été ajouté avec succès.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setAmount("");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout du solde.", {
        description: "Un problème est survenu lors de l'ajout du solde.",
      });
    },
  });

  const handleSubmit = () => {
    const solde = Number(amount);
    if (isNaN(solde) || solde <= 0) {
      alert("Veuillez entrer un montant valide.");
      return;
    }
    addSoldeMutation.mutate(solde);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-500 space-x-3">
          <CirclePlus size={16} />
          <span>Solde</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter Solde</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="solde" className="text-right">
              Solde
            </Label>
            <Input
              type="number"
              id="solde"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="Entrez le montant"
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
            disabled={addSoldeMutation.isPending}
            onClick={handleSubmit}
            type="submit"
          >
            {addSoldeMutation.isPending ? "En cours..." : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddSoldeButton;
