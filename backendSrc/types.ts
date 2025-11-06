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
  amountTime: number;
  modules: string[] | string;
  published: boolean;
};

export type TCoursesResponse = TCourse[];

export type TModule = {
  id: string;
  name: string;
  lessons: string[] | string;
};

export type TModulesResponse = TModule[];

export type TLesson = {
  id: string;
  name: string;
  exercises: string[] | string;
};

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
