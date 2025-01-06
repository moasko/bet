import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

function BetForm() {
  const [amount, setAmount] = React.useState(1000);
  const [potentialWin, setPotentialWin] = React.useState(1500);
  const [percentageGain, setPercentageGain] = React.useState(50);
  const [team1, setTeam1] = React.useState("Équipe A");
  const [team2, setTeam2] = React.useState("Équipe B");
  const [isSubmitted, setIsSubmitted] = React.useState(false); // État pour afficher le ticket

  const predefinedAmounts = [500, 1000, 2000];

  function onAmountChange(adjustment: number) {
    const newAmount = Math.max(100, amount + adjustment);
    setAmount(newAmount);
    calculatePotentialWin(newAmount);
  }

  function setPredefinedAmount(selectedAmount: number) {
    setAmount(selectedAmount);
    calculatePotentialWin(selectedAmount);
  }

  function calculatePotentialWin(newAmount: number) {
    const odds = 1.5;
    const newPotentialWin = newAmount * odds;
    setPotentialWin(newPotentialWin);
    const gainPercentage = ((newPotentialWin - newAmount) / newAmount) * 100;
    setPercentageGain(gainPercentage);
  }

  function handleSubmit() {
    setIsSubmitted(true); // Afficher le ticket après soumission
  }

  function handleCloseTicket() {
    setIsSubmitted(false); // Cacher le ticket
  }

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className=" bg-red-500 text-white rounded-sm w-full">
            Placer un pari
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm p-4">
            <DrawerHeader>
              <div className="my-4 text-center">
                <h2 className="text-lg font-semibold">
                  {team1} <span className="text-red-500">vs</span> {team2}
                </h2>
              </div>
            </DrawerHeader>

            {/* Montant du Pari */}
            <div className="flex items-center justify-center space-x-4 my-6">
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 border-red-500"
                onClick={() => onAmountChange(-100)}
                disabled={amount <= 100}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="text-2xl font-bold">{amount} XOF</div>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 border-red-500"
                onClick={() => onAmountChange(100)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Sommes prédéfinies */}
            <div className="my-4 text-center">
              <p className="text-sm">Sélectionnez une somme prédéfinie</p>
              <div className="flex space-x-2 justify-center">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => setPredefinedAmount(amount)}
                    className="text-red-500 px-4 py-2"
                    variant={"outline"}
                  >
                    {amount} XOF
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex w-full justify-between items-center mt-10">
              <div className="text-center">
                <p className="text-sm">Gain Potentiel</p>
                <div className="text-2xl font-bold text-gray-700">
                  {potentialWin} XOF
                </div>
              </div>

              <div className="text-center mt-4">
                <div className="text-lg text-red-500">
                  {percentageGain.toFixed(2)}%
                </div>
              </div>
            </div>

            <DrawerFooter className="mt-6 flex">
              <Button
                onClick={handleSubmit}
                className="bg-red-500 text-white w-full py-2"
                size={"lg"}
              >
                Soumettre le Pari
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default BetForm;
