import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

function SignoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant="link" className="px-0 space-x-2">
        <LogOut color="gray" size={20} />
        <span>Déconnexion</span>
      </Button>
    </form>
  );
}

export default SignoutButton;
