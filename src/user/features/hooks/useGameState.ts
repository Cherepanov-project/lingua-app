import { useState, useCallback, useMemo } from "react";
import type { Connection } from "../../../types/matchGame";
import { gameLevels } from "../../../shared/constants/mockMatchGame";

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedRussian, setSelectedRussian] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isWrongSelection, setIsWrongSelection] = useState(false);

  const currentLevelData = useMemo(
    () => gameLevels[currentLevel - 1],
    [currentLevel]
  );

  const shuffledWords = useMemo(() => {
    const russian = currentLevelData.pairs.map((pair) => pair.russian);
    const english = currentLevelData.pairs.map((pair) => pair.english);

    return {
      russian: [...russian].sort(() => Math.random() - 0.5),
      english: [...english].sort(() => Math.random() - 0.5),
    };
  }, [currentLevelData]);

  const selectRussian = useCallback(
    (word: string) => {
      const newWord = selectedRussian === word ? null : word;
      setSelectedRussian(newWord);
      return newWord;
    },
    [selectedRussian]
  );

  const selectEnglish = useCallback(
    (word: string) => {
      const newWord = selectedEnglish === word ? null : word;
      setSelectedEnglish(newWord);
      return newWord;
    },
    [selectedEnglish]
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

      setSelectedRussian(null);
      setSelectedEnglish(null);
      setIsWrongSelection(false);
    },
    [currentLevelData.pairs.length]
  );

  const setWrongSelection = useCallback((isWrong: boolean) => {
    setIsWrongSelection(isWrong);
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedRussian(null);
    setSelectedEnglish(null);
    setIsWrongSelection(false);
  }, []);

  const nextLevel = useCallback(() => {
    if (currentLevel < gameLevels.length) {
      setCurrentLevel((prev) => prev + 1);
      setConnections([]);
      setGameCompleted(false);
      setSelectedRussian(null);
      setSelectedEnglish(null);
      setShowAnswers(false);
      setIsWrongSelection(false);
    }
  }, [currentLevel]);

  const restartGame = useCallback(() => {
    setCurrentLevel(1);
    setConnections([]);
    setGameCompleted(false);
    setSelectedRussian(null);
    setSelectedEnglish(null);
    setShowAnswers(false);
    setIsWrongSelection(false);
  }, []);

  const toggleAnswers = useCallback(() => {
    setShowAnswers((prev) => !prev);
  }, []);

  return {
    currentLevel,
    selectedRussian,
    selectedEnglish,
    connections,
    showAnswers,
    gameCompleted,
    isWrongSelection,
    currentLevelData,
    shuffledWords,
    selectRussian,
    selectEnglish,
    addConnection,
    setWrongSelection,
    resetSelection,
    nextLevel,
    restartGame,
    toggleAnswers,
  };
}
