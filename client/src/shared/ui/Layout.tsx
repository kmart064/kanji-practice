import { Outlet } from "react-router-dom";
import { KanjiBackground } from "@/features/background";

export default function Layout() {
  return (
    <div className="relative min-h-screen text-gray-800 font-sans">
      <KanjiBackground />

      <div className="relative z-10">
        <main className="max-w-3xl mx-auto px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
