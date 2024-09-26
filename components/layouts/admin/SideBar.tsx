import ICONS from "@/constants/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: ICONS.dashboard,
    current: true, // Exemple d'élément actif, assurez-vous que ceci est dynamique
  },
  {
    name: "Parieurs",
    href: "/admin/bettors",
    icon: ICONS.bettors,
    current: false,
  },
  {
    name: "Jeux",
    href: "/admin/games",
    icon: ICONS.game,
    current: false,
  },
  {
    name: "Sports",
    href: "/admin/sports",
    icon: ICONS.sports,
    current: false,
  },
  {
    name: "Dépôts",
    href: "/admin/deposits",
    icon: ICONS.deposits,
    current: false,
  },
  {
    name: "Retraits",
    href: "/admin/withdraws",
    icon: ICONS.withdraws,
    current: false,
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: ICONS.settings,
    current: false,
  },
];

const Item = ({
  name,
  href,
  icon,
  current,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
  current: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 p-2 rounded-md ${
        current ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-600 hover:text-white"
      } transition-colors duration-300`}
      aria-current={current ? "page" : undefined}
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
};

const SideBar = () => {
  // Déterminez l'élément actif basé sur la route actuelle
  // Cela dépend de votre logique de routage, par exemple :
  const currentPath = "/admin"; // Remplacez par la logique pour obtenir le chemin actuel

  return (
    <aside className="bg-gray-800 text-white w-[250px] fixed min-h-screen">
      <div className="bg-white p-2 border-r-2 h-16 flex justify-center items-center">
        <Image src="/brands/logo.png" width={150} height={150} alt="logo" />
      </div>
      <div className="p-4">
        <nav className="mt-6">
          {navigation.map((item) => (
            <Item
              key={item.name}
              name={item.name}
              href={item.href}
              icon={item.icon}
              current={currentPath === item.href} // Dynamique en fonction du chemin actuel
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
