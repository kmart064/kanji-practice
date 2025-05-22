export const getFlexiblePassage = (kanjiList: string) => // flexible - can use kanji other than what is in the list
`
  Please create a passage that uses the following kanji. This is meant to help memorize 
  not only what the kanji mean, but how they are typically used. It is OK for kanji other
  than what is in this list to also show up, but try to limit this to kanji that is within
  intermediate proficiency (unless the kanji is something that is extremely important to know
  or relevant to the topic). The topic can be about anything, whether it be educational, fictional,
  etc. but the most important thing is that the kanji are used in the way that is most applicable 
  to conventional use:
  
  "${kanjiList}"
`;

export const getStrictPassage = (kanjiList: string) => 
`
  Please create a passage that uses only the following kanji. This is meant to help memorize 
  not only what the kanji mean, but how they are typically used. If other kanji are needed,
  please use either furigana or replace it with hiragana. The topic can be about anything, 
  whether it be educational, fictional, etc. but the most important thing is that the kanji 
  are used in the way that is most applicable to conventional use:
  
  "${kanjiList}"
`;