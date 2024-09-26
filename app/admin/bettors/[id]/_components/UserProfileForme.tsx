"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface UserInfos {
  name: string;
  firstName: string;
  email: string;
  phone: string;
  postalCode: string;
  country: string;
}

interface UserProfileFormeProps {
  userInfos: UserInfos;
  isLoading: boolean;
}

const UserProfileForme: React.FC<UserProfileFormeProps> = ({
  userInfos,
  isLoading,
}) => {
  const [formData, setFormData] = useState<UserInfos>(userInfos);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajouter la logique de soumission du formulaire ici
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      {isLoading ? (
        <Card className="mt-8 p-4">
          <h2 className="text-lg font-semibold">
            Chargement des informations...
          </h2>
        </Card>
      ) : (
        <Card className="mt-8 p-4">
          <h2 className="text-lg font-semibold">Information de Kasmire Dabo</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8 mt-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name" className="block font-medium">
                Nom
              </Label>
              <Input
                type="text"
                value={formData.name}
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstName" className="block font-medium">
                Prénom
              </Label>
              <Input
                type="text"
                value={formData.firstName}
                id="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="block font-medium">
                Email
              </Label>
              <Input
                type="email"
                value={formData.email}
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone" className="block font-medium">
                Numéro de Téléphone
              </Label>
              <Input
                type="text"
                value={formData.phone}
                id="phone"
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="postalCode" className="block font-medium">
                Code Postal
              </Label>
              <Input
                type="text"
                value={formData.postalCode}
                id="postalCode"
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="country" className="block font-medium">
                Pays
              </Label>
              <Input
                type="text"
                value={formData.country}
                id="country"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full p-3 bg-blue-600 text-white rounded col-span-2"
            >
              Soumettre
            </button>
          </form>
        </Card>
      )}
    </>
  );
};

export default UserProfileForme;
