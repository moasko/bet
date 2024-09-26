import SimpleLayout from "@/components/layouts/app/SimpleLayout";
import Image from "next/image";
import React from "react";

const payementsMethods = [
  { src: "/bgs/orange.png", label: "ORANGE" },
  { src: "/bgs/wave.jpg", label: "WAVE" },
  { src: "/bgs/mtn.png", label: "MTN" },
  { src: "/bgs/moov.png", label: "MOOV" },
];

const Page: React.FC = () => {
  return (
    <SimpleLayout>
      <div className="p-3">
        <div className="bg-white shadow w-full grid grid-cols-2 mb-5 rounded">
          <div className="border-b-2 text-sm border-red-500 p-3 text-center">
            Dépôt
          </div>
          <div className="border-b-2 p-3 text-sm text-center">Retraits</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {payementsMethods.map((item, index) => (
            <div
              key={index}
              className="bg-white flex flex-col shadow  overflow-hidden"
            >
              <div className="text-lg p-3 font-bold flex justify-center items-center">
                <Image src={item.src} width={40} height={40} alt={item.label} />
              </div>
              <div className="text-sm bg-red-500 p-2 text-white text-center">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Page;
