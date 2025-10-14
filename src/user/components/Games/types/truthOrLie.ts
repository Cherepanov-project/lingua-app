export interface Statement {
  id: number;
  text: string;
  isTrue: boolean;
}

export interface UserSelection extends Statement {
  userAnswer: "Правда" | "Ложь";
}

export type TruthOrLieData = {
  id: string;
  level: number;
  statements: Statement[];
};
