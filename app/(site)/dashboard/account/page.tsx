import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <SimpleLayout goBackLabel="Profile personnel" showFooter={false}>
      <div className="flex flex-col gap-2 p-2">
        {/* Section Compte */}
        <div className="rounded p-4 bg-white">
          <h3 className="text-lg font-bold text-gray-500">Compte</h3>
          <div className="mt-2 flex flex-col gap-2">

            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Nom d utilisateur</p>
              <p className="text-sm font-bold">moasko</p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500"> uméro de compte</p>
              <p className="text-sm font-bold">987733469</p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Votre mot de passe</p>
              <p className="text-sm font-bold">********</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500"> Date d inscription</p>
              <p className="text-sm font-bold">14/09/2024</p>
            </div>
          </div>
        </div>

        {/* Section Contacts */}
        <div className="rounded p-4 bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-500">Contacts</h3>
            <Pencil className="text-gray-500 cursor-pointer" size={18} />
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-sm">
              Téléphone <span className="text-red-500"> (non renseigné) </span>
            </p>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-bold">moasko.dev@gmail.com</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Telegram</p>
              <p className="text-sm font-bold">@moaskoDev_145</p>
            </div>
          </div>
        </div>

        {/* Section Informations personnelles */}
        <div className="rounded p-4 bg-white">
          <h3 className="text-lg font-bold text-gray-500">
            Informations personnelles
          </h3>

          <div className="mt-4">
       
            {/* Nom */}
            <div className="w-full flex justify-between items-center py-2">
              <p className="text-sm text-gray-500">Nom</p>
              <p className="text-sm font-bold">dev</p>
            </div>

            {/* Prénom */}
            <div className="w-full flex justify-between items-center py-2">
              <p className="text-sm text-gray-500">Prénom</p>
              <p className="text-sm font-bold">moasko</p>
            </div>

            {/* Pays */}
            <div className="w-full flex justify-between items-center py-2">
              <p className="text-sm text-gray-500">Pays</p>
              <p className="text-sm font-bold">Côte dIvoire</p>
            </div>

          </div>
        </div>

        {/* Bouton Modifier */}
        <Button className="bg-yellow-400 w-full text-black font-bold h-12">
          MODIFIER
        </Button>
      </div>
    </SimpleLayout>
  );
};

export default page;
