"use client";
import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmationPassword: "",
    referralCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic here
    console.log("Registration attempt", formData);
  };
  return (
    <div className="w-full bg-[#e9f2ee] flex flex-col justify-center p-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Inscription
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nom Complet"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Téléphone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de Passe"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Confirmer le Mot de Passe"
            required
            value={formData.confirmationPassword}
            onChange={handleInputChange}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Referral Code */}
        <div>
          <input
            type="text"
            name="referralCode"
            id="referralCode"
            required
            disabled
            placeholder="Code de Parrainage "
            value={formData.referralCode}
            onChange={handleInputChange}
            className="mt-1 text-sm block w-full p-4 bg-white rounded"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-[10px] bg-[#ffcd05] rounded"
          >
            {"S'INSCRIRE"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
