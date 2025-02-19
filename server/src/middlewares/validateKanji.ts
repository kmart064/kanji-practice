import { body } from 'express-validator';

const isStringArray = (value: unknown): boolean => {
  return Array.isArray(value) && value.every((k) => typeof k === 'string');
};

export const validateKanji = [
  body('kanji')
    .isArray()
    .withMessage('Kanji must be an array')
    .custom(isStringArray)
    .withMessage('Each Kanji must be a string'),
];
