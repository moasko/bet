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
import Link from "next/link";

type Transaction = {
  bettor: string;
  username: string;
  trx: string;
  transacted: string;
  amount: string;
  postBalance: string;
  details: string;
};

const transactions: Transaction[] = [
  {
    bettor: "Kasmire Dabo",
    username: "@jonedo",
    trx: "96ZUROMOAT5K",
    transacted: "2024-08-21 03:32 pm",
    amount: "+1,000.00 USD",
    postBalance: "1,000.00 USD",
    details: "Deposit Via wave",
  },
  {
    bettor: "ouandaogo mohage",
    username: "@moasko",
    trx: "3R4HBJI441WF",
    transacted: "2024-08-21 03:06 pm",
    amount: "+10,000.00 USD",
    postBalance: "10,150.00 USD",
    details: "lyfjt yvhj",
  },
  {
    bettor: "ouandaogo mohage",
    username: "@moasko",
    trx: "2CFRY6F9YFHN",
    transacted: "2024-08-05 01:53 pm",
    amount: "+50.00 USD",
    postBalance: "150.00 USD",
    details: "Deposit Via wave",
  },
  {
    bettor: "ouandaogo mohage",
    username: "@moasko",
    trx: "GYYSDD8ZVO7H",
    transacted: "2024-08-05 01:52 pm",
    amount: "+100.00 USD",
    postBalance: "100.00 USD",
    details: "don",
  },
];

const DepositesTable = () => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Bettor</TableHead>
          <TableHead>TRX</TableHead>
          <TableHead>Transacted</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Post Balance</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-semibold">
              {transaction.bettor} <br />
              <span className="text-blue-500">{transaction.username}</span>
            </TableCell>
            <TableCell>{transaction.trx}</TableCell>
            <TableCell>
              {transaction.transacted} <br />
              <span className="text-gray-500 text-sm">
                {new Date(transaction.transacted).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            </TableCell>
            <TableCell className="text-green-500 font-semibold">
              {transaction.amount}
            </TableCell>
            <TableCell>{transaction.postBalance}</TableCell>
            <TableCell>{transaction.details}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DepositesTable;
