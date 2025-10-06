import { useState, useCallback, useMemo } from "react";
import type { Connection } from "../../../types/matchGame";
import { useGetMatchGameLevelQuery } from "../../../shared/api/matchGameApi";

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isWrongSelection, setIsWrongSelection] = useState(false);

  const { data: currentLevelData } = useGetMatchGameLevelQuery(currentLevel);

  const shuffledWords = useMemo(() => {
    const pairs = currentLevelData?.pairs ?? [];
    const left = pairs.map((pair) => pair.left);
    const right = pairs.map((pair) => pair.right);

    function shuffleArray<T>(array: T[]): T[] {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = copy[i];
        copy[i] = copy[j];
        copy[j] = tmp;
      }
      return copy;
    }

    return {
      left: shuffleArray(left),
      right: shuffleArray(right),
    };
  }, [currentLevelData]);

  const selectLeft = useCallback(
    (word: string) => {
      const newWord = selectedLeft === word ? null : word;
      setSelectedLeft(newWord);
      return newWord;
    },
    [selectedLeft]
  );

  const selectRight = useCallback(
    (word: string) => {
      const newWord = selectedRight === word ? null : word;
      setSelectedRight(newWord);
      return newWord;
    },
    [selectedRight]
  );

  const addConnection = useCallback(
    (connection: Connection) => {
      setConnections((prev) => {
        const newConnections = [...prev, connection];
        if (currentLevelData && newConnections.length === currentLevelData.pairs.length) {
          setGameCompleted(true);
        }
        return newConnections;
      });

      setSelectedLeft(null);
      setSelectedRight(null);
      setIsWrongSelection(false);
    },
    [currentLevelData]
  );

  const setWrongSelection = useCallback((isWrong: boolean) => {
    setIsWrongSelection(isWrong);
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsWrongSelection(false);
  }, []);

  const nextLevel = useCallback(() => {
    const maxLevel = 10;
    if (currentLevel < maxLevel) {
      setCurrentLevel((prev) => prev + 1);
      setConnections([]);
      setGameCompleted(false);
      setSelectedLeft(null);
      setSelectedRight(null);
      setShowAnswers(false);
      setIsWrongSelection(false);
    }
  }, [currentLevel]);

  const restartGame = useCallback(() => {
    setCurrentLevel(1);
    setConnections([]);
    setGameCompleted(false);
    setSelectedLeft(null);
    setSelectedRight(null);
    setShowAnswers(false);
    setIsWrongSelection(false);
  }, []);

  const toggleAnswers = useCallback(() => {
    setShowAnswers((prev) => !prev);
  }, []);

  return {
    currentLevel,
    selectedLeft,
    selectedRight,
    connections,
    showAnswers,
    gameCompleted,
    isWrongSelection,
    currentLevelData,
    shuffledWords,
    selectLeft,
    selectRight,
    addConnection,
    setWrongSelection,
    resetSelection,
    nextLevel,
    restartGame,
    toggleAnswers,
  };
}
