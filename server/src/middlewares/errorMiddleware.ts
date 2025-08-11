import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err instanceof Error ? err.message : "Unknown error occurred");
  const errorMessage =
    err instanceof Error ? err.message : "Internal server error";

  // Always send CORS headers on errors
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");

  res.status(500).json({
    status: "error",
    message: errorMessage,
  });
}
