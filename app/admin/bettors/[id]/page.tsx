"use client";

import { getUserInfo } from "@/back/user";
import AddSoldeButton from "@/components/custom/actionsButtons/AddSoldeButton";
import LockUserButton from "@/components/custom/actionsButtons/LockUserButton";
import SubstractSoldeButton from "@/components/custom/actionsButtons/SubstractSoldeButton";
import StateGrid from "@/components/custom/StateGrid";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, Bell } from "lucide-react";
import React from "react";
import UserProfileForme from "./_components/UserProfileForme";

function BettorDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["userAnalytics", id],
    queryFn: () => getUserInfo(Number(id)),
    enabled: !!id,
  });


  return (
    <div>
      <h1 className="text-xl font-bold">Détails du parieur</h1>
      <StateGrid loading={isLoading} data={data?.infos as any} />
      <div>
        <div className="grid grid-cols-6 gap-4 mt-6">
          <div>
            <AddSoldeButton user_id={Number(id)} />
          </div>
          <div>
            <SubstractSoldeButton user_id={Number(id)} />
          </div>
          <div>
            <Button className="w-full bg-gray-500 space-x-3">
              <Bell size={16} />
              <span>Notificatins</span>
            </Button>
          </div>
          <div>
            <Button className="w-full bg-green-500 space-x-3">
              <CirclePlus size={16} />
              <span>Vérifié</span>
            </Button>
          </div>
          <div>
            <Button className="w-full bg-green-500 space-x-3">
              <CirclePlus size={16} />
              <span>Vérifié</span>
            </Button>
          </div>
          <div>
            <LockUserButton />
          </div>
        </div>
      </div>
      <UserProfileForme userInfos={data?.user} isLoading={isLoading} />
    </div>
  );
}

export default BettorDetailsPage;
