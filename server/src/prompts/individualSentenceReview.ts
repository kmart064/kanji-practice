export const getSentenceReview = (kanjiList: string) =>
  `
For the following words, please generate one sentence using each word. 
Do not put furigana as the purpose is to test that I can read and 
understand the kanji, as well as see how it can be used. Other kanji 
can be used, but try to keep the other words N3 or below.
You may use any **grammatical form** of the kanji (e.g., 眠る → 眠った、眠れない, etc.) 
including transitive/intransitive/passive/causative forms
Please do not bold or otherwise show the word used in each sentence.

Words: "${kanjiList}"
`;
