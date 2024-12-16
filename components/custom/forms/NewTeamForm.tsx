import { Input } from "@/components/ui/input";

function newTeamForm() {
  return (
    <div>
      <Input name="name" placeholder="Nom de l'équipe" />
      <Input name="shortName" placeholder="Nom court de l'équipe" />
      <Input name="slug" placeholder="Slug de l'equipe" />
      <Input name="flag" placeholder="URL de l'image du drapeau" />
    </div>
  );
}

export default newTeamForm;
