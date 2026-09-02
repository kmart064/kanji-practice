import { Request, Response, NextFunction } from "express";
import { getStats } from "../services/getStats.js";

export const getStatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { timeZone } = req.query;
    const stats = await getStats(timeZone as string);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
