import { useState, useCallback, useMemo } from "react";
import shuffle from "lodash.shuffle";
import {fetchLevel} from "../../../shared/api/matchGameApi.ts";
import type {LevelData} from "../../../shared/helpers/matchGameHelpers.ts";

export const useGameState = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentLevelData, setCurrentLevelData] = useState<LevelData>(() => fetchLevel(1));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [connections, setConnections] = useState<
    { left: string; right: string; isCorrect: boolean }[]
  >([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isWrongSelection, setIsWrongSelection] = useState(false);

  const shuffledWords = useMemo(() => {
    return {
      left: shuffle(currentLevelData.pairs.map((p) => p.left)),
      right: shuffle(currentLevelData.pairs.map((p) => p.right)),
    };
  }, [currentLevelData]);

  const selectLeft = useCallback(
    (word: string) => {
      if (selectedLeft === word) {
        setSelectedLeft(null);
        return null;
      }
      setSelectedLeft(word);
      return word;
    },
    [selectedLeft]
  );

  const selectRight = useCallback(
    (word: string) => {
      if (selectedRight === word) {
        setSelectedRight(null);
        return null;
      }
      setSelectedRight(word);
      return word;
    },
    [selectedRight]
  );

  const addConnection = useCallback(
    (connection: { left: string; right: string; isCorrect: boolean }) => {
      if (!connections.some((c) => c.left === connection.left || c.right === connection.right)) {
        setConnections((prev) => [...prev, connection]);
      }

      const total = currentLevelData.pairs.length;
      const correct = connections.filter((c) => c.isCorrect).length + (connection.isCorrect ? 1 : 0);
      if (correct === total) {
        setGameCompleted(true);
      }

      setSelectedLeft(null);
      setSelectedRight(null);
      setIsWrongSelection(false);
    },
    [connections, currentLevelData]
  );

  const setWrongSelection = useCallback((value: boolean) => {
    setIsWrongSelection(value);
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsWrongSelection(false);
  }, []);

  const nextLevel = useCallback(() => {
    const next = currentLevel + 1;
    setCurrentLevel(next);
    setConnections([]);
    setGameCompleted(false);
    setShowAnswers(false);
    resetSelection();
    setCurrentLevelData(fetchLevel(next)); // ← всегда 5 пар
  }, [currentLevel, resetSelection]);

  const restartGame = useCallback(() => {
    setCurrentLevel(1);
    setConnections([]);
    setGameCompleted(false);
    setShowAnswers(false);
    resetSelection();
    setCurrentLevelData(fetchLevel(1));
  }, [resetSelection]);

  const toggleAnswers = useCallback(() => {
    setShowAnswers((prev) => !prev);
  }, []);

  return {
    currentLevel,
    currentLevelData,
    selectedLeft,
    selectedRight,
    connections,
    showAnswers,
    gameCompleted,
    isWrongSelection,
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
};

