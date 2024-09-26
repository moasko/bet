import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function AddNewGame() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-3">
          + Ajouter Un Nouveau Jeu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Ajouter Un Nouveau Jeu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="league">Ligue</Label>
            <Select>
              <SelectTrigger id="league">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="teamOne">Équipe Une</Label>
            <Select>
              <SelectTrigger id="teamOne">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team1">Équipe 1</SelectItem>
                <SelectItem value="team2">Équipe 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="teamTwo">Équipe Deux</Label>
            <Select>
              <SelectTrigger id="teamTwo">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team1">Équipe 1</SelectItem>
                <SelectItem value="team2">Équipe 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="gameStarts">Début du Jeu</Label>
            <Input type="datetime-local" id="gameStarts" />
          </div>
          <div>
            <Label htmlFor="betStarts">Début des Paris</Label>
            <Input type="datetime-local" id="betStarts" />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="betEnds">Fin des Paris</Label>
            <Input type="datetime-local" id="betEnds" />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input type="text" id="slug" placeholder="Les espaces ne sont pas autorisés" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Soumettre</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewGame;
