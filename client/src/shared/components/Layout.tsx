import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-2xl font-bold text-center">Kanji Practice</h1>
      </header>
      <main className="max-w-3xl mx-auto px-4">{children}</main>
    </div>
  );
}
