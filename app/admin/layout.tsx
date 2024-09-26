import SideBar from "@/components/layouts/admin/SideBar";
import Image from "next/image";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {/* Barre latérale */}
    
      <SideBar/>
      {/* Contenu principal */}
      <main className="ml-[250px] bg-gray-100">
        <header className="bg-white p-4 shadow-md mb-4 flex justify-between min-h-16">
          <h1 className="text-xl font-bold"></h1>
        </header>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
