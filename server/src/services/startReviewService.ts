import { Database } from "sqlite";
import { getDueKanji } from "./getDueKanji.js";
import { shuffleArray } from "../utils/shuffle.js";
import { startNewSession, updateSession } from "./reviewSessions.js";
import { getFullPrompt } from "./getReadingPassage.js";
import { Word } from "../models/Word.js";
import { ReviewEntry } from "../models/ReviewEntry.js";
import { ReviewStatus } from "../models/ReviewStatus.js";
import { existingSession } from "./existingSession.js";

export async function startReviewService(
  db: Database,
  sessionId: number
): Promise<string> {
  // get the kanji due for review
  const reviewKanji = await getDueKanji(db);

  // if there's no cards to review, then simply let the user know and exit
  if (reviewKanji.length === 0) {
    return "No cards available to review.";
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

  await updateSession(db, sessionId, reviewEntries);

  return getFullPrompt(reviewBatch);
}
