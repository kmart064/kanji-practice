import { useState } from "react";
import { addKanji } from "@/features/manage-deck/api/addKanji";

export default function AddKanjiForm() {
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
              .replace(/^["']|["']$/g, "")
              .replace(
                /[^\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}()（）ー々～]+/gu,
                ""
              )
        )
        .filter((k) => k !== "");
      const response = await addKanji(kanjiArray);
      let msg = `${response.message}`;

      if (response.inserted.length > 0) {
        msg += `\nInserted: ${response.inserted}`;
      }

      if (response.duplicates.length > 0) {
        msg += `\nDuplicates: ${response.duplicates}`;
      }

      setMessage(msg);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert("Failed to add kanji: " + err.message);
      } else {
        alert("Failed to add kanji: Unknown error");
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
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-28 px-8 btn-tinted btn-green text-white py-2 rounded-lg transition duration-150 shadow"
        >
          Add
        </button>
      </div>
      {message && (
        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
          {message}
        </pre>
      )}
    </form>
  );
}
