import { body, query, validationResult } from "express-validator";
import { RequestHandler } from "express";

const isStringArray = (value: unknown): boolean => {
  return Array.isArray(value) && value.every((k) => typeof k === "string");
};

export const validateKanji = [
  body("kanji")
    .isArray()
    .withMessage("Kanji must be an array")
    .custom(isStringArray)
    .withMessage("Each Kanji must be a string"),
];

type KanjiQuery = { kanji: string };

export const validateSingleKanji: RequestHandler[] = [
  query("kanji")
    .isString()
    .withMessage("Kanji must be a string")
    .notEmpty()
    .withMessage("Kanji cannot be empty")
    .matches(/^\S$/)
    .withMessage("Kanji must be a single non-whitespace character"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
