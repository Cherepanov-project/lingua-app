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

export type TLevel = {
  id: number;
  label: string;
};

export type TLevelsResponse = TLevel[];

export type TCourse = {
  id: number;
  language: string;
  level: string;
  description: string;
  name: string;
  modules: string[] | string;
  published: boolean;
};

export type TCoursesResponse = TCourse[];

export type TModule = {
  id: string;
  name: string;
  lessons: string[] | string;
  grammar: string[] | string;
};

export type TModulesResponse = TModule[];

export interface TLesson {
  id: string;
  name: string;
  exercises: string[] | string;
  listening: string[] | string;
  grammar_exercises: string[] | string;
  orthography: string[] | string;
  newWords: string[] | string;
  reading: string[] | string;
}

export type TLessonsResponse = TLesson[];

export type Word = {
  id: number;
  topic_id: number;
  ru: string;
  en: string;
};

export type TopicWithWords = {
  id: number;
  title: string;
  words: Word[];
};

export type NewWords = TopicWithWords[];
export type TGrammarExercise = {
  id: number;
  grammar_id: number;
  level: string;
  sentence: string;
  missing_words: string[] | string;
};

export type TGrammarExerciseResponse = TGrammarExercise[];
