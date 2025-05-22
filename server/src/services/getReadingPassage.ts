import { ReviewEntry } from "../models/ReviewEntry.js";
import { Word } from "../models/Word.js";
import { getFlexiblePassage } from "../prompts/basicReview.js";

export function getFullPrompt(kanjiList: Word[] | ReviewEntry[]): string {
  const kanji = kanjiList.map((k) => k.kanji).join(", ");
  return getFlexiblePassage(kanji);
}
