import { Request, Response, NextFunction } from "express";
import { addKanjiToDB } from "../services/addKanjiToDB.js";
import { validationResult } from "express-validator";
import { findSamePrefixKanji } from "../services/findSamePrefixKanji.js";
import { deleteKanjiService } from "../services/deleteKanjiService.js";
import { getAdjustedDueKanji } from "../services/getDueKanji.js";

export const addKanji = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { kanji, timeZone } = req.body as {
      kanji: string[];
      timeZone: string;
    };

    const result = await addKanjiToDB(kanji, timeZone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getKanjiList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const kanjiList = await getAdjustedDueKanji();
    res.status(201).json(kanjiList);
  } catch (error) {
    next(error);
  }
};

export const findSimilarKanji = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const kanji = req.query.kanji;
    if (typeof kanji !== "string") {
      res.status(400).json({ error: "kanji must be a string" });
      return;
    }
    const result = await findSamePrefixKanji(kanji);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteKanji = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { kanji } = req.body as { kanji: string[] };
    const result = await deleteKanjiService(kanji);
    res.status(200).json({ message: "Kanji deleted successfully" });
  } catch (error) {
    next(error);
  }
};
