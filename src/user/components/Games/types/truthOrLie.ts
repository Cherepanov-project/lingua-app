export interface Statement {
  id: number;
  statement: string;
  correctValue: boolean;
}

export interface UserSelection extends Statement {
  userAnswer: "Правда" | "Ложь";
}

export type TruthOrLieData = {
  id: number;
  level: number;
  statements: Statement[];
};
