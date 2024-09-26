"use client";

import { getAllBettors } from "@/back/user";
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
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  balance: number;
  status: string;
};

const BettorsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bettorsList"],
    queryFn: () => getAllBettors(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>téléphone</TableHead>
            <TableHead>Actif depuis</TableHead>
            <TableHead>Solde</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell>{user.balance.toLocaleString()}</TableCell>
              <TableCell>
                <Badge color={user.status === "ACTIVE" ? "green" : "red"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  asChild
                  variant={"outline"}
                  className="btn btn-sm btn-danger"
                >
                  <Link href={`/admin/bettors/${user.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BettorsTable;
