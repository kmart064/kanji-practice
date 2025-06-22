import express from "express";
import {
  validateKanji,
  validateSingleKanji,
} from "../middlewares/validateKanji.js";
import {
  addKanji,
  deleteKanji,
  findSimilarKanji,
  getKanjiList,
} from "../controllers/deckManagerController.js";

const router = express.Router();

// Wrap async route handlers to properly forward errors
const asyncHandler =
  (fn: express.RequestHandler) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Use asyncHandler to ensure errors are forwarded to Express middleware
router.post("/add", validateKanji, asyncHandler(addKanji));
router.get("/search", validateSingleKanji, asyncHandler(findSimilarKanji));
router.delete("/delete", validateKanji, asyncHandler(deleteKanji));
router.get("/due-kanji", asyncHandler(getKanjiList));

export default router;
