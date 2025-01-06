import { ClientLayout } from "@/app/client-layout";
import Navigation from "@/components/custom/Navigation";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
  showHeader?: boolean;
  showSecondHeader?: boolean;
  showFirstHeader?: boolean;
  showFooter?: boolean;
  bgClass?: string;
  goBackLabel?: string;
}

const SimpleLayout: React.FC<Props> = ({
  children,
  showHeader = true,
  showSecondHeader = true,
  showFirstHeader = true,
  showFooter = true,
  bgClass = "bg-[#e9f2ee]",
  goBackLabel = "",
}) => {
  return (
    <ClientLayout>
      <div
        className={`min-h-screen flex-1 container-fluid relative ${bgClass}`}
      >
        {showHeader && (
          <Header
            goBackLabel={goBackLabel}
            showFirstHeader={showFirstHeader}
            showSecondHeader={showSecondHeader}
          />
        )}
        <main>{children}</main>
        {showFooter && <Footer />}
        <Navigation />
        <div className=" h-16 w-full"></div>
      </div>
    </ClientLayout>
  );
};

export default SimpleLayout;
