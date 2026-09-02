import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ManageDeckPage } from "@/features/manage-deck";
import { GrammarDemoPage } from "@/features/grammar-demo";
import { ReadingDemoPage } from "@/features/reading-demo";
import { StatisticsPage } from "@/features/statistics";
import { StudyKanjiPage } from "@/features/study-kanji";
import { Dashboard } from "@/pages/dashboard";
import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { Layout } from "@/shared/ui";

export function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("accessToken"),
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
          <Route index element={<LandingPage />} />
          <Route
            path="login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          <Route path="demo" element={<Dashboard isDemo />} />
          <Route path="demo/rdemo" element={<ReadingDemoPage />} />
          <Route path="demo/grammar-demo" element={<GrammarDemoPage />} />
          <Route path="demo/statistics" element={<StatisticsPage isDemo />} />

          {isLoggedIn ? (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="manage" element={<ManageDeckPage />} />
              <Route path="study" element={<StudyKanjiPage />} />
              <Route path="rdemo" element={<ReadingDemoPage />} />
              <Route path="grammar-demo" element={<GrammarDemoPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
            </>
          ) : null}

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
