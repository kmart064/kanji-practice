import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(err); // Log error for debugging
  const errorMessage = err instanceof Error ? err.message : "Internal server error";

  res.status(500).json({
    status: "error",
    message: errorMessage,
  });
}
