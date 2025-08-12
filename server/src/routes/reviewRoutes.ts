import express from "express";
import {
  startReview,
  updateSessionFromReview,
} from "../controllers/reviewController.js";
import { authenticateToken } from "../middlewares/authenticate.js";

const router = express.Router();
router.use(authenticateToken);

// Wrap async route handlers to properly forward errors
const asyncHandler =
  (fn: express.RequestHandler) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Use asyncHandler to ensure errors are forwarded to Express middleware
router.post("/start", asyncHandler(startReview));
router.post("/:id/review-update", asyncHandler(updateSessionFromReview));

export default router;
