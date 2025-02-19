import { getDB } from '../utils/database.js';
import { Request, Response, NextFunction } from "express";
import { addKanjiToDB } from '../services/addKanjiToDB.js';
import { getReviewKanji } from '../services/getReviewKanji.js';
import { validationResult } from 'express-validator';

export const addKanji = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { kanji } = req.body as { kanji: string[] };
    const result = await addKanjiToDB(db, kanji);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getKanjiList = async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const kanjiList = await getReviewKanji(db);
    res.json(kanjiList);
  } catch (error) {
    res.status(500).json({ error: 'Server error' }); // to be changed later
  }
};