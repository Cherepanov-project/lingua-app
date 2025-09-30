export interface Connection {
  russian: string;
  english: string;
  isCorrect: boolean;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ButtonPositions {
  russian: Record<string, Position>;
  english: Record<string, Position>;
}

export type WordStatus = "normal" | "selected" | "connected";
export type WordType = "russian" | "english";
