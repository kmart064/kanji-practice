import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { demoWords } from "@/features/reading-demo/lib/demoWords";
import WordCard from "@/features/reading-demo/ui/WordCard";
import "./ReadingDemoPage.css";

const ReadingDemoPage: React.FC = () => {
  const navigate = useNavigate();

  const [deck, setDeck] = useState(demoWords);
  const [completedCount, setCompletedCount] = useState(0);
  const [sentenceMap, setSentenceMap] = useState<Record<string, number>>({});

  const [resultsMap, setResultsMap] = useState<
    Record<string, { correct: boolean; wrong: boolean }>
  >({});

  const [answer, setAnswer] = useState<boolean | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const item = deck[0];
  const nextItem = deck[1];

  const handleAnswer = (value: boolean) => {
    if (!item || isAnimating || !cardRef.current) return;

    setAnswer(value);
    setIsAnimating(true);

    const el = cardRef.current;

    el.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";

    if (value) {
      el.style.transform = "translateX(150%) rotate(12deg)";
    } else {
      el.style.transform = "translateX(-150%) rotate(-12deg)";
    }

    el.style.opacity = "0";

    setTimeout(() => {
      if (value) {
        setCompletedCount((c) => c + 1);
      }

      setDeck((prevDeck) => {
        const [first, ...rest] = prevDeck;

        setResultsMap((prev) => {
          const existing = prev[first.id] ?? {
            correct: false,
            wrong: false,
          };

          return {
            ...prev,
            [first.id]: {
              correct: existing.correct || value,
              wrong: existing.wrong || !value,
            },
          };
        });

        if (value) {
          return rest;
        } else {
          setSentenceMap((prev) => {
            const currentIndex = prev[first.id] ?? 0;

            const otherOptions = [0, 1, 2].filter((i) => i !== currentIndex);

            const nextIndex =
              otherOptions[Math.floor(Math.random() * otherOptions.length)];

            return {
              ...prev,
              [first.id]: nextIndex,
            };
          });

          return [...rest, first];
        }
      });

      setAnswer(null);
      setShowTranslation(false);

      el.style.transition = "";
      el.style.transform = "";
      el.style.opacity = "";

      setIsAnimating(false);
    }, 500);
  };

  const totalWords = demoWords.length;
  const progressPercent = (completedCount / totalWords) * 100;
  const correctCount = demoWords.filter((word) => {
    const result = resultsMap[word.id];
    return result?.correct && !result?.wrong;
  }).length;

  const percent = Math.round((correctCount / totalWords) * 100);

  const getSummary = () => {
    if (percent >= 90) {
      return {
        message:
          "Outstanding! If this was too easy, consider adding more vocabulary to your daily reviews to further challenge yourself.",
        bg: "bg-green-100",
      };
    } else if (percent >= 80) {
      return {
        message:
          "Excellent performance! This score is a good indication that you are challenging yourself while also not rushing the process. Keep it up!",
        bg: "bg-blue-100",
      };
    } else if (percent >= 70) {
      return {
        message:
          "Good effort. You're on the right track, but some more repetition and a slightly slower pace should help solidify your understanding.",
        bg: "bg-yellow-100",
      };
    } else {
      return {
        message:
          "Keep going. This is a sign you should slow down and spend more time reviewing these words.",
        bg: "bg-red-100",
      };
    }
  };
  const summary = getSummary();

  if (!item) {
    return (
      <div className="page">
        <div className="panel-surface p-8 max-w-4xl mx-auto">
          <div className="bg-slate-50 backdrop-blur-sm rounded-xl p-6 shadow">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Results</h1>
              <p className="text-gray-600 text-sm mt-1">
                Review your performance from this session
              </p>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                {demoWords.map((word) => {
                  const result = resultsMap[word.id];

                  let icon = "—";
                  if (result?.wrong) icon = "❌";
                  else if (result?.correct) icon = "✅";

                  return (
                    <div
                      key={word.id}
                      className="flex items-center gap-3 border-b border-black pb-1"
                    >
                      <span className="text-xl">{icon}</span>

                      <span className="text-lg">{word.word}</span>
                    </div>
                  );
                })}
              </div>

              <div
                className={`w-64 rounded-xl shadow p-4 flex flex-col justify-between ${summary.bg}`}
              >
                <div>
                  <div className="text-center text-3xl font-bold mb-2">
                    {percent}%
                  </div>

                  <p className="text-sm text-gray-700 text-center">
                    {summary.message}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/demo")}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white hover:bg-gray-300 hover:text-black rounded-lg"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const sentenceIndex = sentenceMap[item.id] ?? 0;

  return (
    <div className="page">
      <div className="panel-surface mx-auto max-w-[46rem] p-8 space-y-6">
        <div className="text-center mt-6 mb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Kanji Recognition
          </h1>
          <p className="text-gray-500 mt-1">Reading Comprehension Demo</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="progress-label">
              {completedCount} / {totalWords}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="grid w-full max-w-md">
              {nextItem && (
                <div className="col-start-1 row-start-1 z-0 translate-y-2 scale-95 opacity-70">
                  <WordCard
                    key={nextItem.id}
                    item={{
                      ...nextItem,
                      sentence:
                        nextItem.sentences[sentenceMap[nextItem.id] ?? 0],
                      translation:
                        nextItem.translations[sentenceMap[nextItem.id] ?? 0],
                    }}
                    answer={null}
                    showTranslation={false}
                    setAnswer={() => {}}
                    toggleTranslation={() => {}}
                  />
                </div>
              )}

              <div ref={cardRef} className="col-start-1 row-start-1 z-10">
                <WordCard
                  key={item.id}
                  item={{
                    ...item,
                    sentence: item.sentences[sentenceIndex],
                    translation: item.translations[sentenceIndex],
                  }}
                  answer={answer}
                  showTranslation={showTranslation}
                  setAnswer={handleAnswer}
                  toggleTranslation={() => setShowTranslation((prev) => !prev)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => setShowInstructions((prev) => !prev)}
              aria-label={
                showInstructions ? "Hide instructions" : "Show instructions"
              }
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              <ChevronUpIcon
                className={[
                  "h-4 w-4 transition-transform",
                  showInstructions ? "rotate-0" : "rotate-180",
                ].join(" ")}
              />
              <span>Instructions</span>
            </button>

            {showInstructions ? (
              <p className="mt-2 max-w-md text-sm text-slate-700">
                First, try to read the sentence. If you understood it, click the
                green checkmark. If not, reveal the word. If you still cannot
                understand, reveal the translation and click the red X.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingDemoPage;
