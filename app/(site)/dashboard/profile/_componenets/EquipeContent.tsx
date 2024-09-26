import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import MemberItem from "./MemberItem";

const EquipeContent = () => {
  const totalMembers = 455;
  const repartitionNiveaux = [
    { niveau: "Niveau 1", personnes: 45 },
    { niveau: "Niveau 2", personnes: 60 },
    { niveau: "Niveau 3", personnes: 30 },
  ];

  const members = [
    { date: "12/11/2024 - 15:45", level: "Level 1", name: "Moasko dev" },
    { date: "12/11/2024 - 15:45", level: "Level 1", name: "Moasko dev" },
    { date: "12/11/2024 - 15:45", level: "Level 1", name: "fred455" },
    { date: "12/11/2024 - 15:45", level: "Level 1", name: "juazed_mlo" },
    // Ajoute d'autres membres ici...
  ];

  return (
    <div className="w-full">
      {/* Section des stats générales */}
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-between items-center gap-3">
                <p className="text-lg font-medium">Nombre total des membres</p>
                <p className="font-bold text-2xl text-gray-800">
                  {totalMembers}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="w-full h-12 border-b border-gray-300 flex items-center justify-center">
                <p className="text-sm text-gray-500">
                  Répartition des membres par niveau
                </p>
              </div>
              <div className="w-full flex flex-col gap-4 mt-4">
                {repartitionNiveaux.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="text-gray-700 font-medium">{item.niveau}</p>
                    <p className="text-gray-800 font-semibold">
                      {item.personnes} personnes
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Liste des membres */}
      <div className="w-full flex gap-2 flex-col pt-2">
        {members.map((member, index) => (
          <MemberItem
            key={index}
            date={member.date}
            level={member.level}
            name={member.name}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipeContent;
