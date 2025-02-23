import express from 'express';
import { startSession, getSessionInfo, updateSessionFromReview, completeSessionFromReview } from '../controllers/reviewController.js'

const router = express.Router();

// Wrap async route handlers to properly forward errors
const asyncHandler = (fn: express.RequestHandler) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Use asyncHandler to ensure errors are forwarded to Express middleware
router.post('/start', asyncHandler(startSession));
router.get('/:id', asyncHandler(getSessionInfo));
router.post('/:id/review', asyncHandler(updateSessionFromReview));
router.post('/:id/complete', asyncHandler(completeSessionFromReview));

export default router;
