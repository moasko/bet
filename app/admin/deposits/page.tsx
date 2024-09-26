import React from 'react'
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
import DepositesTable from '@/components/custom/tables/DepositesTable';
const page = () => {
  return (
    <div>
           <div className="dlex">
        <h1 className="text-xl font-bold">Parieurs</h1>
        <p>Contenu de l admin</p>
        </div>
        <Card className="p-4">
      <CardHeader className="flex justify-between">
      </CardHeader>
      <CardContent>
        <DepositesTable />
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
  )
}

export default page