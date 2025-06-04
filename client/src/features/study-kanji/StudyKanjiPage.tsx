import { useState } from "react";
import { startStudying, updateStudySession } from "./studyKanjiAPI";

export default function StudyKanjiPage() {
  const [message, setMessage] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<number>();

  const startSession = async () => {
    const response = await startStudying();
    setMessage(response.message);
    setSessionActive(true);
    setSessionId(response.sessionId);
  };

  const handleSubmit = async () => {
    const kanjiArray = input
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    if (!sessionId) throw Error("No sessionId assigned for study session.");
    const response = await updateStudySession(sessionId, kanjiArray);
    setMessage(`${response.message}\n${response.response}`);
    setInput("");

    if (response.status === "Complete") {
      setSessionActive(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Study Kanji
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
        {message && (
          <div className="bg-gray-100 dark:bg-gray-700 text-sm p-4 rounded whitespace-pre-wrap">
            {message}
          </div>
        )}

        {!sessionActive ? (
          <div className="flex justify-center">
            <button
              onClick={startSession}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Start Studying
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              className="w-full h-32 p-3 border rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-600"
              placeholder="Enter forgotten kanji, comma-separated"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition mx-auto block"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
