import { body } from "express-validator";
import { isValidTimeZone } from "../utils/timeZone.js";

export const validateTimeZone = body("timeZone")
  .isString()
  .withMessage("Time zone must be a string")
  .bail()
  .custom(isValidTimeZone)
  .withMessage("Invalid time zone");
