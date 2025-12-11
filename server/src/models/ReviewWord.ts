import { Word } from "./Word.js";

export interface ReviewWord extends Word {
  reviewStage: number;
  reviewDate: string | null;
}
