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
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

function LockUserButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-500 space-x-3">
          <Lock size={16} />
          <span>Blocker le compte</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bloquer cet utilisateur</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
         
          <div>
            <Label htmlFor="motif" className="text-right mb-3">
              Motif du bloquage
            </Label>
            <Textarea id="motif" placeholder="Tapez votre message ici." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Bloquer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LockUserButton;
