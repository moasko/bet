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
import { Edit, Trash2, ShoppingCart } from "lucide-react";

const games = [
  {
    title: "OM VS PSG",
    league: "ligue europa",
    category: "FootBall",
    gameStart: "21 Aug, 2024 03:42 PM",
    betStart: "21 Aug, 2024 04:39 PM",
    betEnd: "21 Aug, 2024 07:55 PM",
    markets: 0,
    status: "Enabled",
  },
  {
    title: "PSG VS OM",
    league: "ligue europa",
    category: "FootBall",
    gameStart: "21 Aug, 2024 03:37 PM",
    betStart: "21 Aug, 2024 03:47 PM",
    betEnd: "21 Aug, 2024 04:53 PM",
    markets: 0,
    status: "Enabled",
  },
  // Ajoutez d'autres jeux ici
];

const GamesTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Ligue | Catégorie</TableHead>
          <TableHead>Début du Match</TableHead>
          <TableHead>Début des Paris</TableHead>
          <TableHead>Fin des Paris</TableHead>
          <TableHead>Mises</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center">
                <img
                  src={`/icons/${game.title.split(" ")[0].toLowerCase()}.png`}
                  alt={`${game.title.split(" ")[0]} logo`}
                  className="w-6 h-6 mr-2"
                />
                {game.title}
              </div>
            </TableCell>
            <TableCell>
              <span className="block">{game.league}</span>
              <span className="text-gray-500 text-sm">{game.category}</span>
            </TableCell>
            <TableCell className="text-gray-700">{game.gameStart}</TableCell>
            <TableCell className="text-gray-700">{game.betStart}</TableCell>
            <TableCell className="text-gray-700">{game.betEnd}</TableCell>
            <TableCell className="text-gray-700">{game.markets}</TableCell>
            <TableCell>
              <Badge
                variant={game.status === "Enabled" ? "outline" : "destructive"}
              >
                {game.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 text-red-500"
                >
                  <Trash2 size={16} />
                  <span>Disable</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <ShoppingCart size={16} />
                  <span>Markets</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GamesTable;
