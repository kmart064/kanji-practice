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
import { getGroqPassage } from "../services/groqRequest.js";

export const startReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // first check if a session already exists
    let sessionId = await existingSession();
    if (sessionId) {
      // if it exists, get the current review cards
      const reviewBatch = await getCurrentBatch();
      const prompt = getFullPrompt(reviewBatch);
      const response = await generateResponse(prompt);
      const wordList = formatWordList(reviewBatch.map((word) => word.kanji));
      res.status(201).json({ sessionId, message: response, wordList });
    } else {
      sessionId = await startNewSession();
      const response = await startReviewService(sessionId);
      const wordList = formatWordList(response.wordList);
      res.status(201).json({ sessionId, message: response.passage, wordList });
    }
  } catch (error) {
    next(error);
  }
};

export const getSessionInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await getSession(Number(req.params.id));
    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const updateSessionFromReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = Number(req.params.id);
    const { incorrectKanji, timeZone } = req.body;

    const update = await updateReview(sessionId, incorrectKanji, timeZone);

    let response = "";
    let status = "";
    let message = "";
    let wordList = "";

    if (update.nextReviewCards.length === 0) {
      message = "Session complete";
      status = "Complete";
      response = "All scheduled cards reviewed! Congratulations!";
      // delete the session data since it has been completed
      await deleteSession(Number(req.params.id));
    } else {
      // return to the user the next cards to review
      message = "Session updated";
      status = "In Progress";
      const prompt = getFullPrompt(update.nextReviewCards);
      response = await generateResponse(prompt);
      wordList = formatWordList(
        update.nextReviewCards.map((word) => word.kanji),
      );
    }

    if (update.unaddedKanji.length === 0) {
      res.json({
        status,
        message,
        wordList,
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
        wordList,
        note:
          "The following kanji have not yet been added to the db: " + newKanji,
        response,
      });
    }
  } catch (error) {
    next(error);
  }
};

async function generateResponse(prompt: string): Promise<string> {
  let response = prompt;
  if (process.env.USE_API === "true") {
    // send prompt request to the API and get a response passage
    response = await getGroqPassage(prompt);
  }
  return response;
}

function formatWordList(wordList: string[]): string {
  let result = "";
  for (let i = 0; i < wordList.length; ++i) {
    result = result.concat(i + 1 + ". " + wordList[i] + "\n");
  }
  return result;
}
