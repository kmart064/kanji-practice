import { env } from "process";
import { ReviewEntry } from "../models/ReviewEntry.js";
import { Word } from "../models/Word.js";
import { getSentenceReview } from "../prompts/individualSentenceReview.js";
import { getThemedPassage } from "../prompts/themedReview.js";
import { getFlexiblePassage } from "../prompts/basicReview.js";

export function getFullPrompt(kanjiList: Word[] | ReviewEntry[]): string {
  const kanji = kanjiList.map((k) => k.kanji).join(", ");
  const reviewType = process.env.REVIEW_TYPE;
  if (reviewType === "sentence") return getSentenceReview(kanji);
  else if (reviewType === "theme") return getThemedPassage(kanji);
  else return getFlexiblePassage(kanji);
}
