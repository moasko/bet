"use client";

import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/hooks/useProfile";
import { Mail, Settings, UserCog, Users } from "lucide-react";
import Link from "next/link";
import EquipeContent from "./_componenets/EquipeContent";
import ProfileTab from "./_componenets/ProfileTab";

// Contenu des onglets
const tabContents = {
  profile: "Make changes to your account here.",
  referals: "Manage your referral team here.",
  settings: "Adjust your account settings here.",
};

const Page = () => {
  const { user, balance, isLoading, isAuthenticated } = useProfile();

  if (isLoading) {
    return (
      <SimpleLayout showFooter={false} showSecondHeader={false}>
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </SimpleLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SimpleLayout showFooter={false} showSecondHeader={false}>
      <div className="flex flex-col gap-2 p-2">
        {/* Profil et notifications */}
        <div className="bg-white rounded shadow p-3">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Avatar>
                  <AvatarFallback className="bg-gray-500 text-white">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500">
                    {user?.name || "Utilisateur"}
                  </p>
                  <p className="font-bold text-md">{`${balance || 0} XOF`}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              {/* Icône Mail avec badge */}
              <Link href="/notifications" className="relative block">
                <div className="absolute top-0 right-0 flex justify-center items-center w-4 h-4 bg-red-500 text-[10px] text-white rounded-full">
                  3
                  <div className="absolute animate-ping top-0 right-0 w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <Mail size={19} />
              </Link>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="bg-red-500 rounded text-xs">
                Mes Paris
              </Button>
              <Button
                size="sm"
                className="bg-[#ffd904] text-black rounded text-xs"
                asChild
              >
                <Link href="/payement">Faire un dépôt</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Onglets de gestion */}
        <div className="bg-white rounded shadow">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="profile">
                <UserCog size={18} />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="referals">
                <Users size={18} />
                <span>Equipe</span>
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings size={18} />
                <span>Réglages</span>
              </TabsTrigger>
            </TabsList>

            {/* Contenu des onglets */}
            <div className="p-3">
              <TabsContent value="profile">
                <ProfileTab />
              </TabsContent>
              <TabsContent value="referals">
                <EquipeContent />
              </TabsContent>
              <TabsContent value="settings">{tabContents.settings}</TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Page;
