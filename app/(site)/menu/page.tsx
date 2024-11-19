"use client";

import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import {
  Calendar,
  Download,
  Gift,
  Globe,
  Headphones,
  LucideIcon,
  Phone,
  User,
} from "lucide-react"; // Importation des icônes
import { FC } from "react";

// Type pour les props du composant MenuItem
interface MenuItemProps {
  title: string;
  icon: LucideIcon;
}

// Composant MenuItem sans déroulement et sans sous-menu
const MenuItem: FC<MenuItemProps> = ({ title, icon: Icon }) => {
  return (
    <div className="border-b">
      <div className="w-full flex justify-between items-center p-4">
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-red-600" />
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
      </div>
    </div>
  );
};

// Composant Menu principal sans état pour le déroulement et sans sous-menu
const Menu: FC = () => {
  return (
    <div className="bg-white max-w-sm mx-auto">
      <MenuItem title="Connexion" icon={User} />
      <MenuItem title="Sports" icon={Calendar} />
      <MenuItem title="Promotions" icon={Gift} />
      <MenuItem title="Média social" icon={Phone} />
      <MenuItem title="Télécharger l'application" icon={Download} />
      <MenuItem title="Support en ligne" icon={Headphones} />
      <MenuItem title="Langue Française" icon={Globe} />
    </div>
  );
};

// Page principale exportée en TypeScript
const Page: FC = () => {
  return (
    <SimpleLayout showFooter={false} goBackLabel="MENU">
      <div className="mt-5">
        <Menu />
      </div>
    </SimpleLayout>
  );
};

export default Page;
