import Sidebar from "@/components/Templates/UserPanel/Sidebar/Sidebar";
import UserPanelTopNavigation from "@/components/Templates/UserPanel/TopBar/TopBar";
import React, { useEffect, useState } from "react";

export default function UserPanelLayout({ children }: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="container">
      <div className="flex gap-8 mt-10">
        <Sidebar responsive={false} />
        <div className="lg:w-[70%] w-full">
          <UserPanelTopNavigation />
          <Sidebar responsive={true} />
          {isMounted ? children : null}
        </div>
      </div>
    </div>
  );
}
