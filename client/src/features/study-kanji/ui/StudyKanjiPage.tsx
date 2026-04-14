import { useEffect, useState } from "react";
import {
  startStudying,
  updateStudySession,
} from "@/features/study-kanji/api/studyKanji";

export default function StudyKanjiPage() {
  const [message, setMessage] = useState<string>("");
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<number>();
  const [wordList, setWordList] = useState<string>("");

  const [forgotten, setForgotten] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForgotten({});
  }, [message]);

  const kanjiArray = wordList
    ? wordList
        .split(/\r?\n/)
        .map((s) => s.trim().replace(/^\d+\.\s*/, ""))
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

    const forgottenKanjiArray = Object.entries(forgotten)
      .filter(([_, checked]) => checked)
      .map(([kanji]) => kanji);

    const response = await updateStudySession(sessionId, forgottenKanjiArray);

    setMessage(`${response.message}\n${response.response}`);
    setWordList(response.wordList || "");
    setForgotten({});

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

      <div className="glass-opaque p-6 rounded-2xl shadow-lg space-y-4">
        {message && (
          <div className="glass-opaque text-sm p-4 rounded whitespace-pre-wrap">
            {message}
          </div>
        )}

        {wordList && (
          <button
            onClick={copyKanjiList}
            className="btn-tinted btn-purple text-white font-semibold py-2 px-4 rounded-lg transition mx-auto block"
          >
            Copy Kanji List
          </button>
        )}

        {!sessionActive ? (
          <div className="flex justify-center">
            <button
              onClick={startSession}
              className="btn-tinted btn-blue text-white font-semibold py-2 px-4 rounded-lg transition"
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
                  className="flex border-2 hover:bg-blue-400 border-blue-300 bg-transparent p-2 rounded-lg"
                  style={{ minWidth: 160 }}
                >
                  <div className="w-6 flex-shrink-0 flex justify-center">
                    <input
                      type="checkbox"
                      checked={!!forgotten[kanji]}
                      onChange={() => toggleForgotten(kanji)}
                    />
                  </div>

                  <div className="ml-2 dark:text-black break-words">
                    {kanji}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="btn-tinted btn-green text-white font-semibold py-2 px-4 rounded-lg transition mx-auto block"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
