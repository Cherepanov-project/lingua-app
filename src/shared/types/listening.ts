export interface ListeningQuestion {
  question: string;
  options: string[];
  correct: string;
}

export interface ListeningExercise {
  id: string;
  name: string;
  description: string;
  level: string;
  imageUrl: string;
  audioUrl: string;
  questions: ListeningQuestion[];
  progress: number;
}
