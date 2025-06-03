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
    <div>
      <h1>Study Kanji</h1>
      {!sessionActive ? (
        <>
          <p>{message && <pre>{message}</pre>}</p>
          <button onClick={startSession}>Start Studying</button>
        </>
      ) : (
        <>
          <p>{message && <pre>{message}</pre>}</p>
          <textarea
            placeholder="Enter forgotten kanji, comma-separated"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Send</button>
        </>
      )}
    </div>
  );
}
