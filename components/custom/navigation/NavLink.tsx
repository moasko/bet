"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex flex-col justify-center items-center px-3 py-1 transition-all duration-200 ease-in-out ${
        isActive ? "text-yellow-500" : "text-gray-700"
      } hover:text-yellow-600`}
    >
      <div
        className={`rounded-full p-1 transition-colors ${
          isActive ? "bg-yellow-400" : "hover:bg-gray-200"
        }`}
      >
        <span className="w-6 h-6">{icon}</span> {/* Taille des icônes réduite */}
      </div>
      <span className="mt-1 text-[10px] font-medium">{label}</span> {/* Taille plus petite du label */}
    </Link>
  );
};

export default NavLink;
