"use client";

import {
  HomeIcon,
  MenuIcon,
  TicketIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import NavLink from "./navigation/NavLink";

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navLinks: NavLinkProps[] = [
  {
    href: "/",
    label: "Sports",
    icon: <TrophyIcon size={20} />, // Taille des icônes ajustée à 20px
  },
  {
    href: "/payement",
    label: "Payement",
    icon: <HomeIcon size={20} />, // Icône adaptée pour "Casino"
  },
  {
    href: "/coupon",
    label: "Coupon d...",
    icon: <TicketIcon size={20} />,
  },
  {
    href: "/profil",
    label: "Se conne...",
    icon: <UserIcon size={20} />,
  },
  {
    href: "/menu",
    label: "Menu",
    icon: <MenuIcon size={20} />,
  },
];

function Navigation() {
  return (
    <div className="flex shadow-sm shadow-slate-500 fixed w-full bottom-0 left-0 z-50 justify-between items-center p-2 bg-white">
      <div className="flex justify-between items-center w-full">
        {navLinks.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </div>
    </div>
  );
}

export default Navigation;
