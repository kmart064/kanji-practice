import { ReviewEntry } from "../models/ReviewEntry.js";
import { Word } from "../models/Word.js";
import { getThemedPassage } from "../prompts/themedReview.js";

export function getFullPrompt(kanjiList: Word[] | ReviewEntry[]): string {
  const kanji = kanjiList.map((k) => k.kanji).join(", ");
  return getThemedPassage(kanji);
}
