import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
  showHeader?: boolean;
  showSecondHeader?: boolean;
  showFooter?: boolean;
  bgClass?: string;
  goBackLabel?: string;
}

const SimpleLayout: React.FC<Props> = ({
  children,
  showHeader = true,
  showSecondHeader = true,
  showFooter = true,
  bgClass = "bg-[#e9f2ee]",
  goBackLabel = "",
}) => {
  return (
    <div className={`min-h-full flex-1 relative ${bgClass}`}>
      {showHeader && <Header goBackLabel={goBackLabel} showSecondHeader={showSecondHeader} />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default SimpleLayout;
