import { getSession, updateSession } from "./reviewSessions.js";
import { updateIncorrectKanji, updateCorrectKanji } from "./updateInterval.js";
import { ReviewEntry } from "../models/ReviewEntry.js";
import { getKanjiIds } from "./getKanjiIds.js";
import { ReviewStatus } from "../models/ReviewStatus.js";
import { shuffleArray } from "../utils/shuffle.js";
import { keysToCamel } from "../utils/snakeToCamel.js";
import { updateResults } from "./updateResults.js";
import { completeReviewSession } from "./reviewSessionHistory.js";

/**
 * Takes in the user's incorrect kanji and updates the database
 * with the incorrect and correct kanji from the current review
 * batch. Then, determines the next review batch, updates the
 * session with all of the changes made, and returns the new
 * review batch.
 * @param sessionId
 * @param incorrectKanji
 * @returns the next review batch
 */
export async function updateReview(
  sessionId: number,
  incorrectKanji: string[],
): Promise<{ nextReviewCards: ReviewEntry[]; unaddedKanji: string[] }> {
  // get the remaining cards for the session
  let session = (await getSession(sessionId)) ?? [];
  let cards: ReviewEntry[] = session.map(keysToCamel<ReviewEntry>); // change keys from snake_case to camelCase
  let unaddedKanji: string[] = [];

  if (cards.length > 0) {
    // check that all submitted incorrect kanji are actually in the batch
    const currentBatch = cards.filter(
      (card) => card.status === ReviewStatus.Batch,
    );
    const currentBatchKanji = new Set(currentBatch.map((card) => card.kanji));

    for (const kanji of incorrectKanji) {
      if (!currentBatchKanji.has(kanji)) {
        // if the kanji wasn't part of the review batch, check if it's already in the database
        const kanjiWord = await getKanjiIds([kanji]);
        if (kanjiWord.length) {
          // if the kanji is already in the database, its review date will need to be reset, which is done later
        } else {
          // if the kanji is not in the database, let the user know in the response
          unaddedKanji.push(kanji);
        }
      }
    }

    // for all incorrect kanji, update the review date in the database
    await updateIncorrectKanji(incorrectKanji);

    // get the incorrect kanji ids
    const incorrectWords = await getKanjiIds(incorrectKanji);
    let incorrectWordsMap = new Map(
      incorrectWords.map((entry) => [entry.kanji, entry]),
    );

    // get the correct cards from the review and change the status of batch
    // cards that were incorrect from batch to incorrect
    let correctWords: string[] = [];
    cards.forEach((card) => {
      if (
        card.status === ReviewStatus.Batch &&
        incorrectWordsMap.get(card.kanji) === undefined
      ) {
        correctWords.push(card.kanji);
        card.status = ReviewStatus.Correct;
      } else if (
        card.status === ReviewStatus.Batch &&
        incorrectWordsMap.get(card.kanji)
      ) {
        card.status = ReviewStatus.Incorrect;
      }
    });

    // update the correct cards review date in the database
    await updateCorrectKanji(correctWords);

    const results = currentBatch.map((card) => ({
      wordId: card.wordId,
      correct: !incorrectKanji.includes(card.kanji),
    }));
    // update the review results table with the results for this review batch
    await updateResults(sessionId, results);

    // get the next batch to review
    let nextReview = getNextBatch(cards);

    // update the session with all the changes
    await updateSession(sessionId, cards);

    if (nextReview.length == 0) {
      await completeReviewSession(sessionId);
    }
    return { nextReviewCards: nextReview, unaddedKanji };
  }
  await completeReviewSession(sessionId);
  return { nextReviewCards: [], unaddedKanji };
}

/**
 * Retrieves the next batch of cards for review. Normally,
 * this is just finding the next X cards that have deck status,
 * but if we've reached the end and still have cards that were
 * incorrect, then all the incorrect cards need to be recycled
 * and put back into the deck for re-review.
 * @param deck the current deck being reviewed. CARD STATUSES WILL BE MODIFIED.
 * @returns a deep copy of the next review batch of cards
 */
function getNextBatch(deck: ReviewEntry[]): ReviewEntry[] {
  // try to get at least X cards for review
  const cardsPerCycle = Number(process.env.CARDS_PER_CYCLE) || 10;
  let newBatch: ReviewEntry[] = [];
  let incorrectCount = 0;

  // search the deck for cards available for review. If not enough
  // cards are found, recycle previously incorrect cards for re-review.
  // Searching will continue until either the limit for review cards
  // has been reached, or all possible cards left for review have been found.
  while (true) {
    deck = shuffleArray(deck);
    for (let i = 0; i < deck.length && newBatch.length < cardsPerCycle; ++i) {
      if (deck[i].status === ReviewStatus.Deck) {
        deck[i].status = ReviewStatus.Batch;
        newBatch.push(structuredClone(deck[i]));
      } else if (deck[i].status === ReviewStatus.Incorrect) {
        ++incorrectCount;
      }
    }

    if (newBatch.length === cardsPerCycle) {
      return newBatch;
    } else if (incorrectCount > 0) {
      // if we didn't reach the number of cards per review but we still have incorrect cards
      // left, then set those incorrect cards back to reviewable and attempt to add them to the
      // batch
      deck.forEach((card) => {
        if (card.status === ReviewStatus.Incorrect) {
          card.status = ReviewStatus.Deck;
          --incorrectCount;
        }
      });
    } else {
      // if there are no incorrect cards left then we have reached the last batch, so it doesn't
      // have to be of standard count
      return newBatch;
    }
  }
}
