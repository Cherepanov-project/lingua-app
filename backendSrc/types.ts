export type TMatchGame = {
  id: number;
  level: number;
  pairs:
    | {
        left: string;
        right: string;
      }[]
    | string;
};

export type TMatchGamesResponse = TMatchGame[];

export type TTruthOrLieGame = {
  id: number;
  level: number;
  statements:
    | {
        statement: string;
        correctValue: string;
      }[]
    | string;
};

export type TTruthOrLieGamesResponse = TTruthOrLieGame[];

export type TPicture = {
  id: number;
  img: string;
  title: string;
  tag: string;
};

export type TPicturesResponse = TPicture[];

export type TLanguage = {
  label: string;
  code: string;
  emoji: string;
};

export type TLanguagesResponse = TLanguage[];
