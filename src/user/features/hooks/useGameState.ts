import { useState, useCallback, useMemo } from "react";
import type { Connection } from "../../../types/matchGame";
import { gameLevels } from "../../../shared/constants/mockMatchGame";

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isWrongSelection, setIsWrongSelection] = useState(false);

  const currentLevelData = useMemo(
    () => gameLevels[currentLevel - 1],
    [currentLevel]
  );

  const shuffledWords = useMemo(() => {
    const left = currentLevelData.pairs.map((pair) => pair.left);
    const right = currentLevelData.pairs.map((pair) => pair.right);

    return {
      left: [...left].sort(() => Math.random() - 0.5),
      right: [...right].sort(() => Math.random() - 0.5),
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
        if (newConnections.length === currentLevelData.pairs.length) {
          setGameCompleted(true);
        }
        return newConnections;
      });

      setSelectedLeft(null);
      setSelectedRight(null);
      setIsWrongSelection(false);
    },
    [currentLevelData.pairs.length]
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
    if (currentLevel < gameLevels.length) {
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
