import React from "react";

function UserLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-[100vh] w-full relative">{children}</div>;
}

export default UserLayout;
