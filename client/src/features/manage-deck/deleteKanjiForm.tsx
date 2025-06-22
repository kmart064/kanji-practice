import { useState } from "react";
import { deleteKanji } from "./deleteKanjiAPI";

export default function DeleteKanjiForm() {
  const [inputText, setKanji] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const kanjiArray = inputText
        .split(",")
        .map(
          (k) =>
            k
              .trim()
              .replace(/^["']|["']$/g, "") // remove surrounding quotes
              .replace(/[^\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}ー々]+/gu, "") // remove non-Japanese chars
        )
        .filter((k) => k !== "");
      const response = await deleteKanji(kanjiArray);
      let msg = `${response.message}`;

      setMessage(msg);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert("Failed to delete kanji: " + err.message);
      } else {
        alert("Failed to delete kanji: Unknown error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Enter kanji (comma-separated)
      </label>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setKanji(e.target.value)}
        placeholder="例：日, 本, 語"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-150 shadow"
      >
        Submit
      </button>
      {message && (
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
          {message}
        </pre>
      )}
    </form>
  );
}
