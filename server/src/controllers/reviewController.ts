import { getDB } from "../utils/database.js";
import { Request, Response, NextFunction } from "express";
import {
  startNewSession,
  getSession,
  deleteSession,
} from "../services/reviewSessions.js";
import { startReviewService } from "../services/startReviewService.js";
import { updateReview } from "../services/updateReview.js";
import { getFullPrompt } from "../services/getReadingPassage.js";
import {
  existingSession,
  getCurrentBatch,
} from "../services/existingSession.js";

export const startReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = getDB();
    // first check if a session already exists
    let sessionId = await existingSession(db);
    if (sessionId) {
      // if it exists, get the current review cards
      const reviewBatch = await getCurrentBatch(db);
      const response = getFullPrompt(reviewBatch);
      res.status(201).json({ sessionId, message: response });
    } else {
      sessionId = await startNewSession(db);
      const response = await startReviewService(db, sessionId);
      res.status(201).json({ sessionId, message: response });
    }
  } catch (error) {
    next(error);
  }
};

export const getSessionInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = getDB();
    const session = await getSession(db, Number(req.params.id));
    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const updateSessionFromReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const db = getDB();
    const sessionId = Number(req.params.id);
    const { incorrectKanji } = req.body;

    const update = await updateReview(db, sessionId, incorrectKanji);

    let response = "";
    let status = "";
    let message = "";

    if (update.nextReviewCards.length === 0) {
      message = "Session complete";
      status = "Complete";
      response = "All scheduled cards reviewed! Congratulations!";
      // delete the session data since it has been completed
      await deleteSession(db, Number(req.params.id));
    } else {
      // return to the user the next cards to review
      message = "Session updated";
      status = "In Progress";
      response = getFullPrompt(update.nextReviewCards);
    }

    if (update.unaddedKanji.length === 0) {
      res.json({
        status,
        message,
        response,
      });
    } else {
      let newKanji = "";
      for (const kanji of update.unaddedKanji) {
        newKanji = newKanji.concat(kanji + ", ");
      }
      newKanji = newKanji.substring(0, newKanji.length - 2);
      res.json({
        status,
        message,
        note:
          "The following kanji have not yet been added to the db: " + newKanji,
        response,
      });
    }
  } catch (error) {
    next(error);
  }
};
