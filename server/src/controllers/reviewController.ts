import { getDB } from '../utils/database.js';
import { Request, Response, NextFunction } from "express";
import { startNewSession, getSession, updateSession, completeSession } from '../services/reviewSessions.js';

export const startSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    const sessionId = await startNewSession(db);
    res.status(201).json({ sessionId, message: 'Review session started' });
  } catch (error) {
    next(error);
  }
};

export const getSessionInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    const session = await getSession(db, Number(req.params.id));
    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const updateSessionFromReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    const sessionId = Number(req.params.id);
    const { correctKanji, incorrectKanji } = req.body;

    await updateSession(db, sessionId, correctKanji, incorrectKanji);
    res.json({ message: 'Session updated', correctKanji, incorrectKanji });
  } catch (error) {
    next(error);
  }
};

export const completeSessionFromReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = getDB();
    await completeSession(db, Number(req.params.id));
    res.json({ message: 'Review session completed' });
  } catch (error) {
    next(error);
  }
};