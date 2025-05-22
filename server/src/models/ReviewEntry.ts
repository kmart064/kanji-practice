import { ReviewStatus } from "./ReviewStatus.js";

export interface ReviewEntry {
  wordId: number;
  kanji: string;
  status: ReviewStatus;
}
