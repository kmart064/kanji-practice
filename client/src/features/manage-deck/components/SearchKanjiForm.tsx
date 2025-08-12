import { useState } from "react";
import { searchKanji } from "../services/searchKanjiAPI";

export default function SearchKanjiForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<{ kanji: string }[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const searchPrefix = searchTerm
        .trim()
        .replace(/^["']|["']$/g, "") // remove surrounding quotes
        .replace(/[^\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}ー々]+/gu, ""); // remove non-Japanese chars
      const response = await searchKanji(searchPrefix);
      setResults(response);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert("Failed to find kanji: " + err.message);
      } else {
        alert("Failed to find kanji: Unknown error");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter kanji to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </form>

      <ul className="mt-4">
        {results.map((item, index) => (
          <li key={index}>
            {index + 1}: {item.kanji}
          </li>
        ))}
      </ul>
    </>
  );
}
