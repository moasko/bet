import Barcode from "react-barcode";

function Ticket() {
  return (
    <div className="flex bg-red-900 flex-col items-center justify-center min-h-screen bg-center bg-cover">
      <div className="w-[100%]">
        {" "}
        {/* Limite la largeur à 90% */}
        <div className="flex flex-col">
          <div className="bg-white relative rounded-lg p-4 m-4">
            <div className="flex-none sm:flex">
              <div className="relative h-32 w-32 sm:mb-0 mb-3 hidden">
                <img
                  src="/brands/logo_user.png"
                  alt="Logo"
                  className="w-32 h-32 object-cover rounded-2xl"
                />
              </div>
              <div className="flex-auto justify-evenly">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-3 rounded-full bg-white w-8 h-8">
                      <img
                        src="/brands/logo_user.png"
                        className="h-8 p-1"
                        alt="Event Icon"
                      />
                    </span>
                    <h2 className="font-bold text-sm">STORE BET</h2>
                  </div>
                  <div className="ml-auto text-red-800">Cote: 1.75%</div>
                </div>
                <div className="border-dashed border-b-2 my-5"></div>

                <div className="w-full">
                  <div className="w-full">
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <div className=" space-x-2 flex items-center">
                          <span>PSG</span>
                          <span className="text-[10px] text-gray-500">
                            {"(Paris st Germin)"}
                          </span>
                        </div>
                        <div>0</div>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div className=" space-x-2 flex items-center">
                          <span>PSG</span>
                          <span className="text-[10px] text-gray-500">
                            {"(Paris st Germin)"}
                          </span>
                        </div>
                        <div>0</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-dashed border-b-2 my-5 pt-5">
                  <div className="absolute rounded-full w-10 h-10 bg-red-900 -mt-5 -left-7"></div>
                  <div className="absolute rounded-full w-10 h-10 bg-red-900 -mt-5 -right-7"></div>
                </div>

                <div className="flex items-center justify-between mb-2 p-5 text-sm">
                  <div className="flex flex-col">
                    <span className="text-sm">Mise</span>
                    <div className="font-semibold">50 XOF</div>{" "}
                    {/* Changement ici */}
                  </div>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm">Potentiel Gain</span>
                    <div className="font-semibold">87.50 XOF</div>{" "}
                    {/* Changement ici */}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2 px-5">
                  <div className="flex flex-col text-sm">
                    <span className="">Cote</span>
                    <div className="font-semibold"></div>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="">Date de la mise</span>
                    <div className="font-semibold">22/10/2024</div>
                  </div>
                </div>

                <div className="border-dashed border-b-2 my-5 pt-5">
                  <div className="absolute rounded-full w-10 h-10 bg-red-900 -mt-5 -left-7"></div>
                  <div className="absolute rounded-full w-10 h-10 bg-red-900 -mt-5 -right-7"></div>
                </div>

                <div className="flex flex-col py-2 justify-center text-sm">
                  <h6 className="font-bold text-center">Ticket de Paris</h6>
                  <div className="barcode h-14 w-0 inline-block mt-4 relative">
                    <Barcode
                      value="barcode-example"
                      width={1}
                      height={35}
                      fontSize={10}
                      textAlign="center"
                      marginLeft={48}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
