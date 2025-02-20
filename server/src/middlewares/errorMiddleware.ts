import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  logger.error(err instanceof Error ? err.message : "Unknown error occurred");
  const errorMessage = err instanceof Error ? err.message : "Internal server error";

  res.status(500).json({
    status: "error",
    message: errorMessage,
  });
}
