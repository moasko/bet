"use client";

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
import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const leagues = [
  {
    name: "Ligue 1",
    shortName: "L1",
    slug: "ligue-1",
    status: "Enabled",
    logo: "/logos/ligue-1.png",
  },
  {
    name: "Premier League",
    shortName: "PL",
    slug: "premier-league",
    status: "Disabled",
    logo: "/logos/premier-league.png",
  }
];

const LeaguesTable = () => {
  const router = useRouter();

  const gotToTeam = (slug: string) => {
    router.push(`/admin/teams`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Nom court</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagues.map((league, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center">
                <img
                  src={league.logo}
                  alt={`${league.name} logo`}
                  className="w-6 h-6 mr-2"
                />
                {league.name}
              </div>
            </TableCell>
            <TableCell>{league.shortName}</TableCell>
            <TableCell>{league.slug}</TableCell>
            <TableCell>
              <Badge
                variant={
                  league.status === "Enabled" ? "outline" : "destructive"
                }
              >
                {league.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                  onClick={() => gotToTeam(league.slug)}
                >
                  <Eye size={16} />
                  <span>Equipes</span>
                </Button> */}
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

export default LeaguesTable;
