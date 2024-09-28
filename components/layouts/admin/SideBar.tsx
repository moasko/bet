"use client";

import ICONS from "@/constants/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Importer le hook usePathname

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: ICONS.dashboard,
  },
  {
    name: "Parieurs",
    href: "/admin/bettors",
    icon: ICONS.bettors,
  },
  {
    name: "Equipes",
    href: "/admin/teams",
    icon: ICONS.teams,
  },
  {
    name: "Jeux",
    href: "/admin/games",
    icon: ICONS.game,
  },
  {
    name: "Sports",
    href: "/admin/sports",
    icon: ICONS.sports,
  },
  {
    name: "Dépôts",
    href: "/admin/deposits",
    icon: ICONS.deposits,
  },
  {
    name: "Retraits",
    href: "/admin/withdraws",
    icon: ICONS.withdraws,
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: ICONS.settings,
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
  // Utiliser usePathname pour obtenir le chemin actuel
  const currentPath = usePathname();

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
              current={currentPath === item.href} // Comparer le chemin actuel avec celui de l'élément
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
