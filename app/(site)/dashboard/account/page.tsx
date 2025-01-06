"use client";

import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Pencil } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { user, isLoading } = useProfile();

  if (isLoading) {
    return (
      <SimpleLayout goBackLabel="Profile personnel" showFooter={false}>
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </SimpleLayout>
    );
  }

  return (
    <SimpleLayout goBackLabel="Profile personnel" showFooter={false}>
      <div className="flex flex-col gap-2 p-2">
        {/* En-tête avec Avatar */}
        <div className="rounded p-4 bg-white flex items-center gap-4 mb-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-gray-500 text-white text-xl">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold text-lg">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Section Compte */}
        <div className="rounded p-4 bg-white">
          <h3 className="text-lg font-bold text-gray-500">Compte</h3>
          <div className="mt-2 flex flex-col gap-2">

          <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">ID utilisateur</p>
              <p className="text-sm font-bold">{user?.id}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Nom d'utilisateur</p>
              <p className="text-sm font-bold">{user?.name}</p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Votre mot de passe</p>
              <p className="text-sm font-bold">********</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Statut du compte</p>
              <p className="text-sm font-bold">{user?.statuts || "Actif"}</p>
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
            <div className="w-full flex justify-between items-center">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-bold">{user?.email}</p>
            </div>
            <p className="text-sm">
              Téléphone <span className="text-red-500">(non renseigné)</span>
            </p>
          </div>
        </div>

        {/* Section Informations personnelles */}
        <div className="rounded p-4 bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-500">
              Informations personnelles
            </h3>
            <Pencil className="text-gray-500 cursor-pointer" size={18} />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/profile">Retour au profil</Link>
          </Button>
          <Button className="bg-yellow-400 text-black font-bold">
            MODIFIER
          </Button>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Page;
