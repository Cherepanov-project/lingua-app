export interface Connection {
  left: string;
  right: string;
  isCorrect: boolean;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ButtonPositions {
  left: Record<string, Position>;
  right: Record<string, Position>;
}

export type WordStatus = "normal" | "selected" | "connected";
export type WordType = "left" | "right";
