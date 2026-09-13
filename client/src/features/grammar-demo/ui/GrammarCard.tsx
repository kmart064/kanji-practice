import React from "react";
import type { GrammarCardItem } from "@/features/grammar-demo/model/types";

type Props = {
  item: GrammarCardItem;
  selectedChoiceId: string | null;
  isAnswered: boolean;
  showTranslation: boolean;
  selectChoice: (choiceId: string) => void;
  toggleTranslation: () => void;
};

const GrammarCard: React.FC<Props> = ({
  item,
  selectedChoiceId,
  isAnswered,
  showTranslation,
  selectChoice,
  toggleTranslation,
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-md text-center space-y-5">
        <p className="text-lg leading-relaxed break-words">{item.sentence}</p>
        <div className="space-y-3">
          {item.choices.map((choice) => {
            const isCorrect = choice.id === item.correctChoiceId;
            const isSelected = choice.id === selectedChoiceId;

            let borderClass = "border-gray-300";

            if (isAnswered) {
              if (isCorrect) {
                borderClass = "border-green-500";
              } else {
                borderClass = "border-red-500";
              }
            }

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => selectChoice(choice.id)}
                disabled={isAnswered}
                className={`w-full px-4 py-3 rounded-lg border-2 text-left transition ${borderClass} ${
                  !isAnswered ? "hover:bg-gray-50" : "cursor-default"
                } ${isSelected && !isAnswered ? "bg-gray-100" : ""}`}
              >
                {choice.text}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <>
            <button
              type="button"
              onClick={toggleTranslation}
              className="text-sm text-gray-400"
            >
              {showTranslation ? "Hide Translation" : "Show Translation"}
            </button>

            {showTranslation && (
              <p className="text-gray-600 border-t pt-2">{item.translation}</p>
            )}
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default GrammarCard;
