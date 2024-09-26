"use client";

import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

type StatsCardProps = {
  data: {
    title: string;
    value: string;
    description: string;
    period?: string;
    route?: string;
  };
} & React.HTMLAttributes<HTMLDivElement>;

const StateCard = ({ data, className, ...other }: StatsCardProps) => {
  const { title, value, description, period, route } = data;

  return (
    <div
      className={`p-4 bg-white shadow-md rounded-lg ${className}`}
      {...other}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {route && (
          <Link href={route}>
            <Badge variant={"outline"} color="red" className="text-[10px]">
                Voir plus 
            </Badge>
           
          </Link>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        <p className={`text-[10px] mt-1 text-gray-400`}>
            {description} {period && <span className="text-gray-500">{period}</span>}
        </p>
      </div>
    </div>
  );
};

export default StateCard;
