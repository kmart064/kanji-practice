import React, { useState, useEffect } from "react";
import type { DemoWordCardItem } from "@/features/reading-demo/model/types";

type Props = {
  item: DemoWordCardItem;
  answer: boolean | null;
  showTranslation: boolean;
  setAnswer: (value: boolean) => void;
  toggleTranslation: () => void;
};

const WordCard: React.FC<Props> = ({
  item,
  answer,
  showTranslation,
  setAnswer,
  toggleTranslation,
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [item.id]);

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-md text-center space-y-4">
        <div onClick={() => setRevealed(!revealed)} className="cursor-pointer">
          {revealed ? (
            <span className="text-2xl font-bold">{item.word}</span>
          ) : (
            <span className="text-gray-400">Click to reveal word</span>
          )}
        </div>

        <p className="text-lg leading-relaxed max-w-sm mx-auto break-words">
          {item.sentence}
        </p>

        <div className="flex justify-center gap-4 flex-row-reverse">
          <button
            onClick={() => setAnswer(true)}
            className={`px-4 py-2 rounded-lg border ${
              answer === true ? "bg-green-300" : ""
            }`}
          >
            ✔
          </button>

          <button
            onClick={() => setAnswer(false)}
            className={`px-4 py-2 rounded-lg border ${
              answer === false ? "bg-red-400" : ""
            }`}
          >
            ❌
          </button>
        </div>

        <button onClick={toggleTranslation} className="text-sm text-gray-400">
          {showTranslation ? "Hide Translation" : "Show Translation"}
        </button>

        {showTranslation && (
          <p className="text-gray-600 border-t pt-2">{item.translation}</p>
        )}
      </div>
    </div>
  );
};

export default WordCard;
