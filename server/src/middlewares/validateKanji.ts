import { body, query, validationResult } from "express-validator";
import { RequestHandler } from "express";

const isStringArray = (value: unknown): boolean => {
  return Array.isArray(value) && value.every((k) => typeof k === "string");
};

const cleanKanjiString = (k: string): string => {
  return k
    .trim()
    .replace(/^["']|["']$/g, "") // remove surrounding quotes
    .replace(/[^\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}()（）ー々～]+/gu, ""); // remove non-Japanese chars
};

export const validateKanji = [
  body("kanji")
    // Sanitize each kanji string in the array:
    .customSanitizer((kanjiArray: string[]) => {
      return kanjiArray.map(cleanKanjiString).filter((k) => k !== "");
    })
    .isArray()
    .withMessage("Kanji must be an array")
    .custom(isStringArray)
    .withMessage("Each Kanji must be a string"),
];

type KanjiQuery = { kanji: string };

export const validateSingleKanji: RequestHandler[] = [
  query("kanji")
    .customSanitizer(cleanKanjiString)
    .isString()
    .withMessage("Kanji must be a string")
    .notEmpty()
    .withMessage("Kanji cannot be empty")
    .matches(/^[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}()（）ー々～]+$/u)
    .withMessage("Kanji must be a single word with only Japanese characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
