import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

function AddNewLeague() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-3">
          + Ajouter Une Nouvelle Ligue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Ajouter Une Nouvelle Ligue</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
          <div className="col-span-1">
            <Label htmlFor="image">Image</Label>
            <div className="border rounded-md p-2 w-[150px] h-[150px] flex items-center justify-center">
              {image ? (
                <img src={image} alt="Upload Preview" className="object-cover w-full h-full" />
              ) : (
                <div className="text-gray-500">150x150</div>
              )}
            </div>
            <Button  className="mt-4">
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                className="hidden h-full w-full"
              />
              Télécharger l image
            </Button>
            <div className="text-xs text-gray-500 mt-1">
              Fichiers supportés : jpeg, jpg, png. L image sera redimensionnée en 150x150 px.
            </div>
          </div>
          <div className="col-span-1">
            <Label htmlFor="category">Catégorie</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionnez une option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category1">Catégorie 1</SelectItem>
                <SelectItem value="category2">Catégorie 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1">
            <Label htmlFor="name">Nom</Label>
            <Input type="text" id="name" required />
          </div>
          <div className="col-span-1">
            <Label htmlFor="shortName">Nom Court</Label>
            <Input type="text" id="shortName" required />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="slug">Slug</Label>
            <Input type="text" id="slug" placeholder="Les espaces ne sont pas autorisés" required />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Soumettre</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewLeague;
