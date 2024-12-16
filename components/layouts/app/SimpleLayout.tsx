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
    <div className={`min-h-screen flex-1 relative ${bgClass}`}>
      {showHeader && (
        <Header
          goBackLabel={goBackLabel}
          showFirstHeader={showFirstHeader}
          showSecondHeader={showSecondHeader}
        />
      )}
      <main>{children}</main>
      <Navigation />
      {showFooter && <Footer />}
      <div className=" h-16 w-full"></div>
    </div>
  );
};

export default SimpleLayout;
