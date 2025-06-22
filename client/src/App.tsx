import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddKanjiPage from "./features/manage-deck/ManageDeckPage";
import StudyKanjiPage from "./features/study-kanji/StudyKanjiPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddKanjiPage />} />
      <Route path="/study" element={<StudyKanjiPage />} />
    </Routes>
  );
}

export default App;
