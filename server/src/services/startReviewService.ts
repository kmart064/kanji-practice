import { getAdjustedDueKanji } from "./getDueKanji.js";
import { shuffleArray } from "../utils/shuffle.js";
import { updateSession } from "./reviewSessions.js";
import { getFullPrompt } from "./getReadingPassage.js";
import { Word } from "../models/Word.js";
import { ReviewEntry } from "../models/ReviewEntry.js";
import { ReviewStatus } from "../models/ReviewStatus.js";
import { getGroqPassage } from "./groqRequest.js";

interface StudyResponse {
  passage: string;
  wordList: string[];
}

export async function startReviewService(
  sessionId: number
): Promise<StudyResponse> {
  // get the kanji due for review
  const reviewKanji = await getAdjustedDueKanji();

  // if there's no cards to review, then simply let the user know and exit
  if (reviewKanji.length === 0) {
    return {
      passage: "No cards available to review.",
      wordList: [],
    };
  }

  // shuffle the kanji
  let shuffledKanji = shuffleArray(reviewKanji);

  // loop through the kanji deck reviewing a customizable amount of cards at a time
  const cardsPerCycle = Number(process.env.CARDS_PER_CYCLE) || 10;

  const reviewBatch: Word[] = shuffledKanji.splice(0, cardsPerCycle); // review cards are removed from the current deck
  const currentDeck: Word[] = shuffledKanji; // the remaining cards

  let reviewEntries: ReviewEntry[] = [];
  reviewBatch.forEach((card) => {
    reviewEntries.push({
      wordId: card.id,
      kanji: card.kanji,
      status: ReviewStatus.Batch,
    });
  });
  currentDeck.forEach((card) => {
    reviewEntries.push({
      wordId: card.id,
      kanji: card.kanji,
      status: ReviewStatus.Deck,
    });
  });

  await updateSession(sessionId, reviewEntries);

  const prompt = getFullPrompt(reviewBatch);
  const wordList = reviewBatch.map((word) => word.kanji);
  if (process.env.USE_API === "true") {
    // send prompt request to the API and get a response passage
    const passage = await getGroqPassage(prompt);
    return {
      passage,
      wordList,
    };
  } else {
    // send the user the request to be manually sent to a gen AI chatbot
    return {
      passage: prompt,
      wordList,
    };
  }
}
