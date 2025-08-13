import { getRandomTheme } from "./themes.js";

export const getThemedPassage = (kanjiList: string) =>
  `
You are a skilled Japanese language teacher who specializes in creating intermediate-level reading passages for learners.
Your task is to write a **natural, cohesive short story or diary-style passage** in Japanese that includes the following kanji: "${kanjiList}"
The passage must be based on the following theme:

**Theme**: ${getRandomTheme()}

Please follow these rules:

- The passage must revolve around the theme above. All sentences should relate to it directly or indirectly.
- Aim for 250-350 characters. Cannot be shorter than 225 characters.
- Do not write example sentences — write a single, unified passage that feels natural and emotionally engaging.
- You may use any **grammatical form** of the kanji (e.g., 眠る → 眠った、眠れない etc.)
- You may use other kanji as needed, but limit them to intermediate-level (JLPT N3 or below).
- Do not include English translation, romaji, or furigana.
- Keep the tone appropriate for an intermediate Japanese learner.

Focus on coherence, mood, and thoughtful integration of the kanji into a meaningful piece of writing.
`;
