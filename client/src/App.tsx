import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddKanjiPage from "./features/manage-deck/components/AddKanjiForm";
import StudyKanjiPage from "./features/study-kanji/components/StudyKanjiPage";
import LoginPage from "./features/authentication/components/Login";

function App() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            {/* Redirect all routes to login if not logged in */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Logged in routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddKanjiPage />} />
            <Route path="/study" element={<StudyKanjiPage />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
