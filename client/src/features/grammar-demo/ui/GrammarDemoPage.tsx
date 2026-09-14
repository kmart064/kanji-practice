import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

import { demoGrammar } from "@/features/grammar-demo/model/demoGrammar";
import GrammarCard from "@/features/grammar-demo/ui/GrammarCard";

type GrammarResult = {
  correct: boolean;
};

const GrammarDemoPage: React.FC = () => {
  const navigate = useNavigate();

  const [deck, setDeck] = useState(demoGrammar);
  const [completedCount, setCompletedCount] = useState(0);

  const [resultsMap, setResultsMap] = useState<Record<string, GrammarResult>>(
    {},
  );

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const [isAnswered, setIsAnswered] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const item = deck[0];
  const nextItem = deck[1];

  const handleChoice = (choiceId: string) => {
    if (!item || isAnswered) return;

    setSelectedChoiceId(choiceId);
    setIsAnswered(true);

    const isCorrect = choiceId === item.correctChoiceId;

    setResultsMap((prev) => ({
      ...prev,
      [item.id]: {
        correct: isCorrect,
      },
    }));
  };

  const handleContinue = () => {
    if (!item || !isAnswered) return;

    setCompletedCount((count) => count + 1);

    setDeck((prevDeck) => {
      const [, ...rest] = prevDeck;
      return rest;
    });

    setSelectedChoiceId(null);
    setIsAnswered(false);
    setShowTranslation(false);
  };

  const totalQuestions = demoGrammar.length;

  const correctCount = demoGrammar.filter((grammar) => {
    return resultsMap[grammar.id]?.correct;
  }).length;

  const percent =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const progressPercent = (completedCount / totalQuestions) * 100;

  const getSummary = () => {
    if (percent >= 90) {
      return {
        message:
          "Outstanding! Your understanding of these grammar structures is very strong.",
        bg: "bg-green-100",
      };
    } else if (percent >= 80) {
      return {
        message:
          "Excellent performance! You have a solid understanding of these grammar structures.",
        bg: "bg-blue-100",
      };
    } else if (percent >= 70) {
      return {
        message:
          "Good effort. Some additional review should help reinforce these grammar structures.",
        bg: "bg-yellow-100",
      };
    } else {
      return {
        message:
          "Keep practicing. Reviewing these grammar structures again should help strengthen your understanding.",
        bg: "bg-red-100",
      };
    }
  };

  const summary = getSummary();

  /*
   * Results screen
   */
  if (!item) {
    return (
      <div className="page">
        <div className="panel-surface p-8 max-w-4xl mx-auto">
          <div className="bg-slate-50 backdrop-blur-sm rounded-xl p-6 shadow">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Results</h1>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 space-y-2">
                {demoGrammar.map((grammar) => {
                  const result = resultsMap[grammar.id];

                  const icon = result?.correct ? "✅" : "❌";

                  return (
                    <div
                      key={grammar.id}
                      className="flex items-center gap-3 border-b border-black pb-2"
                    >
                      <span className="text-xl">{icon}</span>

                      <span className="text-lg">
                        {
                          grammar.choices.find(
                            (choice) => choice.id === grammar.correctChoiceId,
                          )?.text
                        }
                      </span>
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

  return (
    <div className="page">
      <div className="panel-surface mx-auto max-w-[46rem] p-8 space-y-6">
        <div className="text-center mt-6 mb-6">
          <h1 className="text-4xl font-bold tracking-tight">Grammar</h1>

          <p className="text-gray-500 mt-1">Grammar Comprehension Demo</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />

            <div className="progress-label">
              {completedCount} / {totalQuestions}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="grid w-full max-w-md">
              {nextItem && (
                <div className="col-start-1 row-start-1 z-0 translate-y-2 scale-95 opacity-70">
                  <GrammarCard
                    item={nextItem}
                    selectedChoiceId={null}
                    isAnswered={false}
                    showTranslation={false}
                    selectChoice={() => {}}
                    toggleTranslation={() => {}}
                  />
                </div>
              )}

              <div className="col-start-1 row-start-1 z-10">
                <GrammarCard
                  key={item.id}
                  item={item}
                  selectedChoiceId={selectedChoiceId}
                  isAnswered={isAnswered}
                  showTranslation={showTranslation}
                  selectChoice={handleChoice}
                  toggleTranslation={() => setShowTranslation((prev) => !prev)}
                />
              </div>
            </div>
          </div>

          {isAnswered && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleContinue}
                className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Continue
              </button>
            </div>
          )}

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

            {showInstructions && (
              <p className="mt-2 max-w-md text-sm text-slate-700">
                Read the sentence and choose the grammar structure that best
                completes it. Your answer will be evaluated immediately. The
                correct answer will be outlined in green and the incorrect
                answers in red.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarDemoPage;
