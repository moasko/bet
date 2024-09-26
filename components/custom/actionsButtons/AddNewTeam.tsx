import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function AddNewTeam() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-3">
          + Ajouter Une Equipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter Une Equipe</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="w-[150px] h-[150px] bg-gray-300 flex items-center justify-center mb-4">
              <span className="text-gray-500">150x150</span>
            </div>
            <Button className="w-full">Uploader Image</Button>
            <p className="text-sm text-gray-500 mt-2">Fichiers supportés : jpeg, jpg, png. Limage sera redimensionnée en 150x150 px</p>
          </div>
          <div>
            <Label htmlFor="category" className="text-right">
              Catégorie
            </Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input type="text" id="name" />
          </div>
          <div>
            <Label htmlFor="shortName" className="text-right">
              Nom Court
            </Label>
            <Input type="text" id="shortName" />
          </div>
          <div>
            <Label htmlFor="slug" className="text-right">
              Slug
            </Label>
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

export default AddNewTeam;
