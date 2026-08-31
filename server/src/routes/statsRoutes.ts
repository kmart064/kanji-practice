import express from "express";
import { getStatsHandler } from "../controllers/statsController.js";

const router = express.Router();

const asyncHandler =
  (fn: express.RequestHandler) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Use asyncHandler to ensure errors are forwarded to Express middleware
router.get("/", asyncHandler(getStatsHandler));

export default router;
