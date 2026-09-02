import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://kanji-practice-omega.vercel.app",
  "https://kaizenkanji.com",
];

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err instanceof Error ? err.message : "Unknown error occurred");
  const errorMessage =
    err instanceof Error ? err.message : "Internal server error";

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  } else {
    res.header("Access-Control-Allow-Origin", "null");
  }

  res.status(500).json({
    status: "error",
    message: errorMessage,
  });
}
