"use client";

import { getAllTeams } from "@/back/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Edit, Eye } from "lucide-react";
import Image from "next/image";

const leagues = [
  {
    name: "Liverpool",
    shortName: "LIV",
    slug: "liverpool",
    logo: "/logos/premier-league.png",
  },
  {
    name: "Paris Saint-Germain",
    shortName: "PSG",
    slug: "paris-saint-germain",
    logo: "/logos/premier-league.png",
  }
];

const TeamsTable = () => {

  const {data,isLoading} = useQuery({
    queryKey: ["teamsList"],
    queryFn: () => getAllTeams(),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Equipe</TableHead>
          <TableHead>Nom court</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((league, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center">
                <img
                  src={league.flag}
                  alt={`${league.name} logo`}
                  className="w-12 h-12 mr-2"
                />
                {league.name}
              </div>
            </TableCell>
            <TableCell>{league.shortName}</TableCell>
            <TableCell>{league.slug}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
  
                >
                  <Eye size={16} />
                  <span>Equipes</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamsTable;
