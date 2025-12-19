import { useEffect, useState } from "react";
import { startStudying, updateStudySession } from "../services/studyKanjiAPI";

export default function StudyKanjiPage() {
  const [message, setMessage] = useState<string>("");
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<number>();
  const [wordList, setWordList] = useState<string>("");

  // New: store checked (forgotten) kanji
  const [forgotten, setForgotten] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForgotten({});
  }, [message]);

  // Convert the string wordList → array
  const kanjiArray = wordList
    ? wordList
        .split(/\r?\n/) // split by lines
        .map(
          (s) => s.trim().replace(/^\d+\.\s*/, "") // remove leading "1. " or "23. "
        )
        .filter(Boolean)
    : [];

  const toggleForgotten = (kanji: string) => {
    setForgotten((prev) => ({
      ...prev,
      [kanji]: !prev[kanji],
    }));
  };

  const startSession = async () => {
    const response = await startStudying();
    setMessage(response.message);
    setWordList(response.wordList || "");
    setSessionActive(true);
    setSessionId(response.sessionId);
  };

  const handleSubmit = async () => {
    if (!sessionId) throw Error("No sessionId assigned for study session.");

    // Convert checked kanji → comma-separated list (same as before)
    const forgottenKanjiArray = Object.entries(forgotten)
      .filter(([_, checked]) => checked)
      .map(([kanji]) => kanji);

    const response = await updateStudySession(sessionId, forgottenKanjiArray);

    setMessage(`${response.message}\n${response.response}`);
    setWordList(response.wordList || "");
    setForgotten({}); // reset after submission

    if (response.status === "Complete") {
      setSessionActive(false);
    }
  };

  const copyKanjiList = async () => {
    const kanjiCSV = kanjiArray.join(", ");
    await navigator.clipboard.writeText(kanjiCSV);
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

        {wordList && (
          <button
            onClick={copyKanjiList}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition mx-auto block"
          >
            Copy Kanji List
          </button>
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
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              {kanjiArray.map((kanji) => (
                <div
                  key={kanji}
                  className="flex bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                  style={{ minWidth: 160 }} // optional: helps keep consistent cell widths
                >
                  {/* fixed-width checkbox column — ensures checkboxes line up */}
                  <div className="w-6 flex-shrink-0 flex justify-center">
                    <input
                      type="checkbox"
                      checked={!!forgotten[kanji]}
                      onChange={() => toggleForgotten(kanji)}
                    />
                  </div>

                  {/* text column — centered and allowed to wrap */}
                  <div className="ml-2 dark:text-white break-words">
                    {kanji}
                  </div>
                </div>
              ))}
            </div>

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
