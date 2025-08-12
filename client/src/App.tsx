import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudyKanjiPage from "./features/study-kanji/components/StudyKanjiPage";
import LoginPage from "./features/authentication/components/Login";
import ManageDeckPage from "./features/manage-deck/components/ManageDeckPage";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  // Listen for localStorage changes (if token is updated elsewhere)
  useEffect(() => {
    function onStorageChange() {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    }
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route
              path="/login"
              element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/manage" element={<ManageDeckPage />} />
            <Route path="/study" element={<StudyKanjiPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
