export type GrammarChoice = {
  id: string;
  text: string;
};

export type GrammarCardItem = {
  id: string;
  sentence: string;
  choices: GrammarChoice[];
  correctChoiceId: string;
  translation: string;
};
