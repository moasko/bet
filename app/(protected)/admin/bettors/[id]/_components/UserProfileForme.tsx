"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const UserProfileForme = ({
  userInfos,
  isLoading,
}: {
  userInfos: any;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState(userInfos);

  return (
    <div>
        {
            JSON.stringify(userInfos)
        }
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">Chargement...</p>
        </div>
      ) : (
        <Card className="mt-8 p-4">
          <h2 className="text-lg font-semibold">Information de Kasmire Dabo</h2>

          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastName" className="block font-medium">
                Nom
              </Label>
              <Input type="text" value={userInfos?.name} id="lastName" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstName" className="block font-medium">
                Prénom
              </Label>
              <Input type="text" value="Kasmire" id="firstName" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="block font-medium">
                Email
              </Label>
              <Input type="email" value={userInfos?.email} id="email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone" className="block font-medium">
                Numéro de Téléphone
              </Label>
              <Input type="text" value={userInfos?.phone} id="phone" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="postalCode" className="block font-medium">
                Code Postal
              </Label>
              <Input type="text" value="00225" id="postalCode" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="country" className="block font-medium">
                Pays
              </Label>
              <Input type="text" value="Cote d'Ivoire" id="country" />
            </div>
          </div>

          <button className="mt-6 w-full p-3 bg-blue-600 text-white rounded">
            Soumettre
          </button>
        </Card>
      )}
    </div>
  );
};

export default UserProfileForme;
