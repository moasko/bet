import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import {
  Trash,
  CheckSquare,
  ChevronDown,
  Gift,
  Smile,
  Target,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    date: "17/09/2024",
    message: "🎁 Commencez à gagner immédiatement!",
    details:
      "BetWinner vous propose les meilleures machines à sous. Effectuez votre premier dépôt et choisissez votre machine à sous préférée parmi notre vaste collection !",
    time: "17/09 / 10:50",
    isRead: true,
  },
  {
    date: "17/09/2024",
    message: "😀 La chance du débutant, ça existe vraiment ?",
    details:
      "Découvrez les secrets de la chance du débutant et profitez-en pour remporter vos premiers gains dès aujourd'hui.",
    time: "17/09 / 10:50",
    isRead: false,
  },
  {
    date: "16/09/2024",
    message: "⚽ Bonus de premier dépôt de 200 %",
    details:
      "Effectuez un premier dépôt et recevez un bonus de 200% à utiliser sur vos paris sportifs.",
    time: "16/09 / 14:20",
    isRead: false,
  },
];

const NotificationsPage = () => {
  return (
    <SimpleLayout showFooter={false} goBackLabel="Notifications (3)">
      <div className="p-2 flex-1 h-screen">
        {/* Liste des notifications avec Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-2">
          {notifications.map((notification, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded bg-white"
            >
              <AccordionTrigger className="flex items-center justify-between p-3 bg-white rounded">
                <div className="flex items-center space-y-4">
                  <div className="flex flex-col text-left justify-start items-start">
                    <span className="text-xs text-gray-500">
                      {notification.date}
                    </span>
                    <p
                      className={`text-sm font-semibold ${
                        notification.isRead ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      {notification.message}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="bg-gray-50 p-4 rounded-md border-t">
                <span className="text-xs text-gray-500">
                  {notification.time}
                </span>
                <p className="text-sm text-gray-700 my-2">
                  {notification.details}
                </p>
                <button className="bg-green-600 w-full text-white p-4 rounded">
                 J AI COMPRIS
                </button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mt-6 sticky bottom-0 bg-white p-2">
        <div className="flex gap-2 justify-center items-center">
          <Button className="flex w-full items-center text-black bg-yellow-500 text-center p-2 rounded shadow">
            MARQUER TOUS COMME LU
          </Button>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default NotificationsPage;
