import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ManageDeckPage } from "@/features/manage-deck";
import { ReadingDemoPage } from "@/features/reading-demo";
import { StudyKanjiPage } from "@/features/study-kanji";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { Layout } from "@/shared/ui";

export function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {!isLoggedIn ? (
            <>
              <Route
                path="login"
                element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route index element={<HomePage />} />
              <Route path="manage" element={<ManageDeckPage />} />
              <Route path="study" element={<StudyKanjiPage />} />
              <Route path="rdemo" element={<ReadingDemoPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
