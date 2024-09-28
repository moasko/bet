"use client"
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import LeaguesTable from "@/components/custom/tables/LeaguesTable";
import AddNewLeague from "@/components/custom/actionsButtons/AddNewLeague";
const page = () => {
  return (
    <div>
      <div className="w-full flex justify-between mb-7">
        <div>
           <h1 className="text-xl font-bold">Leags</h1>
        <p>Contenu de l admin</p>
        </div>
       <div>
       <div>
          <Button variant="outline" className="mr-2">Filter</Button>
         <AddNewLeague/>
        </div>
       </div>
      </div>
      <Card className="p-4">
        <CardHeader className="flex justify-between"></CardHeader>
        <CardContent>
          <LeaguesTable />
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
