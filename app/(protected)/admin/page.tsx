"use client";

import { Charter } from "@/components/custom/ChartData";
import StateGrid from "@/components/custom/StateGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { counters } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["counters"],
    queryFn: () => counters(),
  });
  return (
    <div>
      <Accordion type="single" collapsible className="w-full bg-red-500">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <StateGrid loadPlaceholderCount={12} loading={isLoading} data={data} />
      <Charter />
    </div>
  );
};

export default Page;
