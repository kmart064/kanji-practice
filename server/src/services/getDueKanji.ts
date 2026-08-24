import { ReviewWord } from "../models/ReviewWord.js";
import pool from "../utils/db.js";
import logger from "../utils/logger.js";
import { keysToCamel } from "../utils/snakeToCamel.js";

const REQUIRED_STAGE_REVIEWS = Number(process.env.REQUIRED_STAGE_REVIEWS ?? 2);
const NONREQUIRED_REVIEW_LIMIT = Number(
  process.env.NONREQUIRED_REVIEW_LIMIT ?? 100,
);
const HARD_LIMIT = Number(process.env.HARD_LIMIT);

/**
 * Retrieves all kanji that have a review date before or on the current day
 * @returns all kanji that have a review date before or on the current day
 */
export async function getDueKanji(): Promise<ReviewWord[]> {
  const sql = `
    SELECT 
      w.id, 
      w.kanji, 
      w.review_stage, 
      w.review_date
    FROM words w
    JOIN srs_schedule s ON w.review_stage = s.stage
    WHERE w.review_date + s.interval_days * INTERVAL '1 day' <= CURRENT_DATE;
  `;
  const result = await pool.query(sql);
  const rows: ReviewWord[] = result.rows.map((row) =>
    keysToCamel<ReviewWord>(row),
  );

  return rows;
}

/**
 * Retrieves a limited number of due kanji based on the REQUIRED_STAGE_REVIEWS
 * and NONREQUIRED_REVIEW_LIMIT values.
 * @returns a limited number of due kanji based on the REQUIRED_STAGE_REVIEWS
 * and NONREQUIRED_REVIEW_LIMIT values.
 */
export async function getAdjustedDueKanji(): Promise<ReviewWord[]> {
  const dueWords = await getDueKanji();
  if (dueWords.length === 0) {
    logger.info("No cards due today.");
    return [];
  }

  const requiredCards = dueWords.filter(
    (w) => w.reviewStage <= REQUIRED_STAGE_REVIEWS,
  );
  const nonrequiredCards = dueWords.filter(
    (w) => w.reviewStage > REQUIRED_STAGE_REVIEWS,
  );

  if (
    nonrequiredCards.length <= NONREQUIRED_REVIEW_LIMIT &&
    dueWords.length <= HARD_LIMIT
  ) {
    logger.info(` All due cards will be reviewed today.`);
    logger.info(`       Required: ${requiredCards.length}`);
    logger.info(`       Nonrequired: ${nonrequiredCards.length}`);
    logger.info(`       Total: ${dueWords.length}`);
    return dueWords;
  }

  // First, sort by nonrequired cards before selecting from them
  nonrequiredCards.sort((a, b) => {
    // Sort by stage first
    if (a.reviewStage !== b.reviewStage) {
      return a.reviewStage - b.reviewStage;
    }

    // Skip date sorting for stage 0 (new cards)
    if (a.reviewStage === 0) return 0;

    // Otherwise, sort by reviewDate ascending
    if (!a.reviewDate && !b.reviewDate) return 0;
    if (!a.reviewDate) return -1;
    if (!b.reviewDate) return 1;
    return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
  });

  // Select cards up to limit
  const selectedNonrequired = nonrequiredCards.slice(
    0,
    NONREQUIRED_REVIEW_LIMIT,
  );
  let nonrequiredSkippedCount =
    nonrequiredCards.length - selectedNonrequired.length;

  let finalSelection = [...requiredCards, ...selectedNonrequired];

  let hardLimitApplied = false;
  let requiredSkippedCount = 0;
  if (finalSelection.length > HARD_LIMIT) {
    finalSelection = finalSelection.slice(0, HARD_LIMIT);
    hardLimitApplied = true;
    if (HARD_LIMIT < requiredCards.length) {
      // only required cards could be selected, and not all of them
      requiredSkippedCount = requiredCards.length - HARD_LIMIT;
      nonrequiredSkippedCount = nonrequiredCards.length;
    } else {
      // all required cards selected, some or none of nonrequired were selected
      nonrequiredSkippedCount =
        nonrequiredCards.length - (HARD_LIMIT - requiredCards.length);
    }
  }

  logger.info(`Adjusted review selection:`);
  if (hardLimitApplied) {
    logger.info(`       ${HARD_LIMIT} Hard limit APPLIED`);
  }
  logger.info(`       Required stages: <= ${REQUIRED_STAGE_REVIEWS}`);
  logger.info(`       Nonrequired limit: ${NONREQUIRED_REVIEW_LIMIT}`);
  logger.info(`       Required cards: ${requiredCards.length}`);
  if (requiredSkippedCount > 0) {
    logger.info(`       Required cards skipped: ${requiredSkippedCount}`);
  }
  logger.info(`       Nonrequired selected: ${selectedNonrequired.length}`);
  logger.info(`       Nonrequired skipped: ${nonrequiredSkippedCount}`);
  logger.info(`       Total selected: ${finalSelection.length}`);
  logger.info(`       Total due (before limit): ${dueWords.length}`);

  return finalSelection;
}
