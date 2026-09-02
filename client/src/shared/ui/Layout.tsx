import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { KanjiBackground } from "@/features/background";
import Sidebar from "./Sidebar";

export default function Layout() {
  const { pathname } = useLocation();
  const showSidebar = pathname !== "/" && pathname !== "/login";
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen text-gray-800 font-sans">
      <KanjiBackground />

      <div className="relative z-10">
        <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-4 lg:px-6 lg:py-6">
          {showSidebar ? (
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              onToggle={() => setIsSidebarCollapsed((current) => !current)}
            />
          ) : null}

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
