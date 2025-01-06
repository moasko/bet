import { getUserById } from "@/actions/user";
import SignoutButton from "@/components/custom/forms/SignoutButton";
import { useWallet } from "@/hooks/useWallet";
import { useQuery } from "@tanstack/react-query";
import {
  Download,
  History,
  List,
  Lock,
  Upload,
  UserCog,
  UserPlus,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileTab = () => {
  const { data: session } = useSession();

  const { balance } = useWallet();

  const { data: user } = useQuery({
    queryKey: ["current-user", session?.user?.email],
    queryFn: () => getUserById(Number(session?.user?.id)),
    enabled: !!session?.user?.email,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Section Compte */}
      <div className="p-3 border-b">
        <h3 className="text-sm text-gray-600">COMPTE</h3>
        {/* <div className="mt-2 mb-4">
          <p className="text-sm">
            Solde actuel: <span className="font-bold">{balance || 0} XOF</span>
          </p>
          <p className="text-xs text-gray-500">
            ID: {user ? user.id : "Utilisateur non identifié"}
          </p>
          <p className="text-xs text-gray-500">
            Statut: {user ? user.statuts : "Statut inconnu"}
          </p>
        </div> */}
        <ul className="mt-2 space-y-2">
          <li>
            <Link
              className="flex items-center py-2 gap-2"
              href={"/dashboard/bet-history"}
            >
              <History color="gray" size={20} />
              <span>Historique des paris</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center py-2 gap-2" href={"/payement"}>
              <Download color="gray" size={20} />
              <span>Effectuer un dépôt</span>
            </Link>
          </li>
          <li className="flex items-center py-2 gap-2">
            <Upload color="gray" size={20} />
            <span>Retirer des fonds</span>
          </li>
          <li className="flex items-center py-2 gap-2">
            <List color="gray" size={20} />
            <span>Historique des transactions</span>
          </li>
        </ul>
      </div>

      {/* Section Profil */}
      <div className="p-3 border-b">
        <h3 className="text-sm text-gray-600">PROFIL</h3>
        {/* <div className="mt-2 mb-4">
          <p className="text-sm font-medium">{user?.name || "Utilisateur"}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <p className="text-xs text-gray-500">
            Rôle: {user?.role || "Utilisateur"}
          </p>
        </div> */}
        <ul className="mt-2 space-y-2">
          <li className="">
            <Link
              className="flex items-center py-2 gap-2"
              href={"/dashboard/account"}
            >
              <UserCog color="gray" size={20} />
              <span>Profil personnel</span>
            </Link>
          </li>
          <li className="flex items-center gap-2 relative">
            <Lock color="gray" size={20} />
            <span>Sécurité</span>
            <p className="absolute right-0 top-0 bg-red-500 text-white text-xs rounded-full px-1 w-4 h-4 flex justify-center items-center">
              <span>1</span>
            </p>
          </li>
        </ul>
      </div>

      {/* Section Autre */}
      <div className="p-3">
        <h3 className="text-sm text-gray-600">AUTRE</h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-center py-2 gap-2">
            <UserPlus color="gray" size={20} />
            <span>Invitez des amis</span>
          </li>
          <li className="flex items-center py-2 border-t gap-2">
            <SignoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileTab;
