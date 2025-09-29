import React, { useCallback, useRef, useEffect } from "react";
import { useGameState } from "../../features/hooks/useGameState";
import { useButtonPositions } from "../../features/hooks/useButtonPositions";
import { WordButton } from "./gameWordButton";
import { ConnectionLines } from "./ConnectionLines";
import { GameControls } from "./GameControls";
import type { WordStatus, WordType } from "../../../types/matchGame";
import { LAYOUT_STYLES } from "../../../shared/constants/matchGame";

export const MatchGame: React.FC = () => {
  const {
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
  } = useGameState();

  const {
    buttonPositions,
    gameContainerRef,
    setRussianRef,
    setEnglishRef,
    updateButtonPositions,
  } = useButtonPositions();

  const timerRef = useRef<number | null>(null);

  const getWordStatus = useCallback(
    (word: string, type: WordType): WordStatus => {
      const isSelected =
        type === "russian"
          ? selectedRussian === word
          : selectedEnglish === word;

      if (isSelected) return "selected";

      const isConnected = connections.some((conn) =>
        type === "russian" ? conn.russian === word : conn.english === word
      );

      return isConnected ? "connected" : "normal";
    },
    [selectedRussian, selectedEnglish, connections]
  );

  const checkConnection = useCallback(
    (russianWord: string, englishWord: string) => {
      const correctPair = currentLevelData.pairs.find(
        (pair: { russian: string; english: string }) =>
          pair.russian === russianWord && pair.english === englishWord
      );

      if (correctPair) {
        addConnection({
          russian: russianWord,
          english: englishWord,
          isCorrect: true,
        });
      } else {
        setWrongSelection(true);
        timerRef.current = window.setTimeout(() => {
          resetSelection();
        }, 500);
      }
    },
    [currentLevelData.pairs, addConnection, setWrongSelection, resetSelection]
  );

  const handleRussianClick = useCallback(
    (word: string) => {
      const selectedWord = selectRussian(word);
      if (selectedWord && selectedEnglish) {
        checkConnection(selectedWord, selectedEnglish);
      }
    },
    [selectRussian, selectedEnglish, checkConnection]
  );

  const handleEnglishClick = useCallback(
    (word: string) => {
      const selectedWord = selectEnglish(word);
      if (selectedRussian && selectedWord) {
        checkConnection(selectedRussian, selectedWord);
      }
    },
    [selectEnglish, selectedRussian, checkConnection]
  );

  useEffect(() => {
    updateButtonPositions();
  }, [currentLevel, shuffledWords, updateButtonPositions]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!shuffledWords.russian.length || !shuffledWords.english.length) {
    return null;
  }

  return (
    <>
      <div ref={gameContainerRef} style={LAYOUT_STYLES.GAME_CONTAINER}>
        <div style={LAYOUT_STYLES.WORDS_CONTAINER}>
          {shuffledWords.russian.map((word, index) => (
            <WordButton
              key={`russian-${word}-${index}`}
              word={word}
              type="russian"
              status={getWordStatus(word, "russian")}
              isWrongSelection={isWrongSelection}
              onClick={handleRussianClick}
              buttonRef={setRussianRef(word)}
            />
          ))}
        </div>

        <div style={LAYOUT_STYLES.WORDS_CONTAINER}>
          {shuffledWords.english.map((word, index) => (
            <WordButton
              key={`english-${word}-${index}`}
              word={word}
              type="english"
              status={getWordStatus(word, "english")}
              isWrongSelection={isWrongSelection}
              onClick={handleEnglishClick}
              buttonRef={setEnglishRef(word)}
            />
          ))}
        </div>

        <ConnectionLines
          connections={connections}
          buttonPositions={buttonPositions}
          selectedRussian={selectedRussian}
          selectedEnglish={selectedEnglish}
          isWrongSelection={isWrongSelection}
        />
      </div>

      <GameControls
        currentLevel={currentLevel}
        gameCompleted={gameCompleted}
        showAnswers={showAnswers}
        currentLevelPairs={currentLevelData.pairs}
        onShowAnswers={toggleAnswers}
        onRestart={restartGame}
        onNextLevel={nextLevel}
      />
    </>
  );
};
