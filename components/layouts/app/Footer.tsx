import LanguageSelector from "@/components/LanguageSelector";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 bg-red-600 w-full p-3">
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
      {/* Section en haut avec barre rouge */}
      <div className="p-3 bg-red-500 h-[80px] text-xs text-center text-white rounded shadow">
        StoreBet utilise des cookies pour vous garantir la meilleure expérience
        utilisateur. En restant sur le site Web, vous acceptez l utilisation de
        vos cookies sur StoreBet.
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
