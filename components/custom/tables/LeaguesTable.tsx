"use client";

import { getAllLeagues } from "@/back/admin";
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
import { useRouter } from "next/navigation";

const LeaguesTable = () => {
  const router = useRouter();

  const { data: leagues, isLoading } = useQuery({
    queryKey: ["leaguesList"],
    queryFn: () => getAllLeagues(),
  });

  const goToTeam = (slug: string) => {
    router.push(`/admin/teams/${slug}`);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Afficher un message de chargement
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagues?.map((league) => (
          <TableRow key={league.slug}> {/* Utiliser le slug comme clé */}
            <TableCell>
              <div className="flex items-center">
                <img
                  src={league.flag} // Assurez-vous que l'attribut est correct (vous aviez 'flag' à l'origine)
                  alt={`${league.name} logo`}
                  className="w-12 h-12 mr-2"
                />
                {league.name}
              </div>
            </TableCell>
            <TableCell>{league.slug}</TableCell>
            <TableCell>
              <Badge
                variant={league.status === "ACTIVE" ? "outline" : "destructive"}
              >
                {league.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                  onClick={() => goToTeam(league.slug)}
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

export default LeaguesTable;
