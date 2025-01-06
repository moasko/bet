"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useAuthStore } from "@/store/useAuthStore";
import { NavLinkProps } from "@/types";
import {
  HomeIcon,
  MenuIcon,
  TicketIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react";
import NavLink from "./client/NavLink";

function Navigation() {
  // Simule l'état de connexion
  const connecteduser = useCurrentUser();
  const { isAuthenticated } = useAuthStore();
  // Données des liens avec adaptation de "Se connecter" en "Profil"
  const navLinks: NavLinkProps[] = [
    {
      href: "/",
      label: "Sports",
      icon: <TrophyIcon size={20} />,
    },
    {
      href: "/payement",
      label: "Payement",
      icon: <HomeIcon size={20} />,
    },
    {
      href: "/coupon",
      label: "Historique",
      icon: <TicketIcon size={20} />,
    },
    {
      href: "/menu",
      label: "Menu",
      icon: <MenuIcon size={20} />,
    },
    {
      href: isAuthenticated ? "/dashboard/profile" : "/auth/signin",
      label: isAuthenticated ? "Profil" : "Se conne...", // Changement dynamique du label
      icon: <UserIcon size={20} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
      <ul className="flex justify-between items-center p-2">
        {navLinks.map((link) => (
          <li key={link.href} className="flex-1 text-center">
            <NavLink {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
