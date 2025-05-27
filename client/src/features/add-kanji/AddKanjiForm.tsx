import { useState } from "react";
import { addKanji } from "./addKanjiAPI";

export default function AddKanjiForm() {
  const [inputText, setKanji] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const kanjiArray = inputText
        .split(",")
        .map((k) => k.trim()) // remove whitespace around each kanji
        .filter((k) => k !== ""); // remove any empty entries
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
    <form onSubmit={handleSubmit}>
      <input value={inputText} onChange={(e) => setKanji(e.target.value)} />
      <button type="submit">Submit</button>
      {message && <pre>{message}</pre>}
    </form>
  );
}
