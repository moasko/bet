import { NavLinkProps } from "@/types";
import React from "react";

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon }) => (
  <a
    href={href}
    className="flex flex-col items-center text-slate-700 hover:text-red-500 transition-all duration-200 ease-in-out"
    aria-label={label}
  >
    {icon}
    <span className="text-[10px] mt-1">{label}</span>
  </a>
);
export default NavLink;
