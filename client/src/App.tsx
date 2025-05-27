import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddKanjiPage from "./features/add-kanji/AddKanjiPage";
//import StudyKanjiPage from "./features/study-kanji/StudyKanjiPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddKanjiPage />} />
    </Routes>
  );
}

export default App;
