import LanguageSelector from "@/components/LanguageSelector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 bg-red-600 w-full p-3">
      {/* Section en haut avec barre rouge */}
      <div className="p-3 bg-red-500 h-[80px] rounded shadow">d</div>

      {/* Section avec les boutons de contact */}
      <div className="grid grid-cols-2 gap-2 text-white">
        <div className="bg-red-500 flex flex-col p-3 rounded shadow justify-center items-center">
          <FaTelegramPlane size={25} />
          <p className="text-center text-sm">Contactez-nous</p>
        </div>
        <div className="bg-red-500 flex flex-col p-3 rounded shadow justify-center items-center">
          <FaTelegramPlane size={25} />
          <p className="text-center text-sm">Service client</p>
        </div>
      </div>

      {/* Texte de mention légale */}
      <div className="mt-4 flex flex-col gap-4">
        <p className="text-center text-[12px] text-white">
          betwinner.com is owned and operated by PREVAILER B.V. as a License
          Holder (Antillephone license No. 8048/JAZ). HARBESINA LTD (reg.number
          HE 405135) provides processing services on the website as a Billing
          Agent with a registered office located at Agias Zonis, 22A, 3027,
          Limassol, Cyprus. All rights reserved and protected by law.
        </p>
        <p className="text-center text-[12px] text-white">
          BetWinner utilise des cookies pour vous garantir la meilleure
          expérience utilisateur. En restant sur le site Web, vous acceptez l
          utilisation de vos cookies sur BetWinner.
        </p>
      </div>

      {/* Section du bas avec icône +18 et sélection de langue */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="bg-red-500 outline-none text-white p-2 rounded">
            +18
          </div>

          {/* Sélecteur de langue sans Image dans les options */}
          <div className="bg-red-500 outline-none p-2 rounded">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
