"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTeam } from "@/hooks/useTeam";
import { Copy, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import MemberItem from "./MemberItem";

const EquipeContent = () => {
  const { stats, members, isLoading, referralCode } = useTeam();
  const [copied, setCopied] = useState(false);

  const handleCopyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast.success("Code de parrainage copié !");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      ACTIVE: "Actif",
      BLOKED: "Bloqué",
      SUSPENDED: "Suspendu",
      PENDING_VERIFICATION: "En attente de vérification",
      DELETED: "Supprimé",
    };
    return statusMap[status] || status;
  };

  return (
    <div className="w-full">
      {/* Code de parrainage */}
      <Card className="p-4 mb-4">
        <h3 className="text-sm font-medium mb-2">Votre code de parrainage</h3>
        <div className="flex gap-2">
          <Input
            value={referralCode || ""}
            readOnly
            className="bg-gray-50"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyReferralCode}
            className={copied ? "bg-green-50" : ""}
          >
            <Copy size={16} />
          </Button>
        </div>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-4">
              <Users className="h-4 w-4" />
              <div>
                <p className="text-sm font-medium">Nombre total des membres</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalMembers || 0}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full h-12 border-b border-gray-300 flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Répartition des membres par statut
              </p>
            </div>
            <div className="w-full flex flex-col gap-4 mt-4">
              {stats?.levelDistribution?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <p className="text-gray-700 font-medium">
                    {formatStatus(item.status)}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {item.count} {item.count > 1 ? "personnes" : "personne"}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="w-full flex gap-2 flex-col pt-4">
        {!members || members.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Aucun membre dans votre équipe pour le moment</p>
            <p className="text-sm">Partagez votre code de parrainage pour commencer à construire votre équipe</p>
          </div>
        ) : (
          members.map((member) => (
            <MemberItem
              key={member.id}
              date={new Date(member.joinedAt).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              level={formatStatus(member.status)}
              name={member.name}
              email={member.email}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EquipeContent;
