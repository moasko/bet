"use clients";

import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowBigRight,
  ArrowRight,
  Download,
  History,
  List,
  Lock,
  LogOut,
  Mail,
  Settings,
  Upload,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import ProfileTab from "./_componenets/ProfileTab";
import EquipeContent from "./_componenets/EquipeContent";

// Contenu des onglets
const tabContents = {
  profile: "Make changes to your account here.",
  referals: "Manage your referral team here.",
  settings: "Adjust your account settings here.",
};




const Page = () => {
  return (
    <SimpleLayout showFooter={false} showSecondHeader={false}>
      <div className="flex flex-col gap-2 p-2">
        {/* Profil et notifications */}
        <div className="bg-white rounded shadow p-3">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://avatar.iran.liara.run/public/boy"
                    alt="User Avatar"
                  />
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500">moasko deb</p>
                  <p className="font-bold text-md">0 XOF</p>
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
              >
                Faire un dépôt
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
