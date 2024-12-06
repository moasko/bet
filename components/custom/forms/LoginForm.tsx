"use client";
import Link from "next/link";
import { useState } from "react";

function LoginForm() {
  const [formData, setFormData] = useState({
    emailOuTelephone: "",
    motDePasse: "",
  });

  const gererChangementInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const gererSoumission = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion ici
    console.log("Tentative de connexion", formData);
  };

  return (
    <div className="w-full min-h-[500px] bg-[#e9f2ee] flex flex-col justify-center p-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Connexion
      </h2>
      <form onSubmit={gererSoumission} className="space-y-4">
        {/* Champ Téléphone ou Email */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Email ou Téléphone"
            required
            value={formData.emailOuTelephone}
            onChange={gererChangementInput}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Champ Mot de Passe */}
        <div>
          <input
            type="password"
            name="motDePasse"
            placeholder="Email ou Téléphone"
            required
            value={formData.motDePasse}
            onChange={gererChangementInput}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Bouton Connexion */}
        <div>
          <button
            type="submit"
            className="w-full p-[10px] bg-[#ffcd05] rounded"
          >
            CONNEXION
          </button>
        </div>

        {/* Liens Mot de Passe Oublié et Inscription */}
        <div className="flex items-center justify-between text-sm mt-4">
          <a href="#" className="text-gray-600 hover:underline">
            Mot de passe oublié ?
          </a>
          <Link href="/auth/signup" className="text-red-600 hover:underline">
            Inscription
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
