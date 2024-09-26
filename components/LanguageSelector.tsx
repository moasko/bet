
"use client";

import Image from "next/image";
import React, { useState } from "react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("fr");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang: string) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Bouton principal qui affiche la langue sélectionnée */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
        <Image
          width={20}
          height={20}
          alt={selectedLang === "fr" ? "French flag" : "English flag"}
          src={selectedLang === "fr" ? "/flags/fr.png" : "/flags/uk.png"}
        />
        <span className="text-white">
          {selectedLang === "fr" ? "Français" : "English"}
        </span>
      </div>

      {/* Dropdown de sélection de la langue */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md">
          <ul className="py-1">
            <li
              onClick={() => selectLanguage("fr")}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <Image
                width={20}
                height={20}
                alt="French flag"
                src="/flags/fr.png"
              />
              <span className="ml-2">Français</span>
            </li>
            <li
              onClick={() => selectLanguage("en")}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <Image
                width={20}
                height={20}
                alt="English flag"
                src="/flags/uk.png"
              />
              <span className="ml-2">English</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
