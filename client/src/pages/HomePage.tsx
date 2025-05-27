import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      <button onClick={() => navigate("/add")}>Add New Kanji</button>
      <button onClick={() => navigate("/study")}>Study Kanji</button>
    </div>
  );
}
