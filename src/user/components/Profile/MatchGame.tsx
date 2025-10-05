import React, { useCallback, useRef, useEffect } from "react";
import { useGameState } from "../../features/hooks/useGameState";
import { useButtonPositions } from "../../features/hooks/useButtonPositions";
import { WordButton } from "./GameWordButton";
import { ConnectionLines } from "./ConnectionLines";
import { GameControls } from "./GameControls";
import type { WordStatus, WordType } from "../../../types/matchGame";
import { LAYOUT_STYLES } from "../../../shared/constants/matchGame";

export const MatchGame: React.FC = () => {
  const {
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
  } = useGameState();

  const {
    buttonPositions,
    gameContainerRef,
    setLeftRef,
    setRightRef,
    updateButtonPositions,
  } = useButtonPositions();

  const timerRef = useRef<number | null>(null);

  const getWordStatus = useCallback(
    (word: string, type: WordType): WordStatus => {
      const isSelected =
        type === "left" ? selectedLeft === word : selectedRight === word;

      if (isSelected) return "selected";

      const isConnected = connections.some((conn) =>
        type === "left" ? conn.left === word : conn.right === word
      );

      return isConnected ? "connected" : "normal";
    },
    [selectedLeft, selectedRight, connections]
  );

  const checkConnection = useCallback(
    (leftWord: string, rightWord: string) => {
      const correctPair = currentLevelData.pairs.find(
        (pair: { left: string; right: string }) =>
          pair.left === leftWord && pair.right === rightWord
      );

      if (correctPair) {
        addConnection({
          left: leftWord,
          right: rightWord,
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

  const handleLeftClick = useCallback(
    (word: string) => {
      const selectedWord = selectLeft(word);
      if (selectedWord && selectedRight) {
        checkConnection(selectedWord, selectedRight);
      }
    },
    [selectLeft, selectedRight, checkConnection]
  );

  const handleRightClick = useCallback(
    (word: string) => {
      const selectedWord = selectRight(word);
      if (selectedLeft && selectedWord) {
        checkConnection(selectedLeft, selectedWord);
      }
    },
    [selectRight, selectedLeft, checkConnection]
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

  if (!shuffledWords.left.length || !shuffledWords.right.length) {
    return null;
  }

  return (
    <>
      <div ref={gameContainerRef} style={LAYOUT_STYLES.GAME_CONTAINER}>
        <div style={LAYOUT_STYLES.WORDS_CONTAINER}>
          {shuffledWords.left.map((word, index) => (
            <WordButton
              key={`left-${word}-${index}`}
              word={word}
              type="left"
              status={getWordStatus(word, "left")}
              isWrongSelection={isWrongSelection}
              onClick={handleLeftClick}
              buttonRef={setLeftRef(word)}
            />
          ))}
        </div>

        <div style={LAYOUT_STYLES.WORDS_CONTAINER}>
          {shuffledWords.right.map((word, index) => (
            <WordButton
              key={`right-${word}-${index}`}
              word={word}
              type="right"
              status={getWordStatus(word, "right")}
              isWrongSelection={isWrongSelection}
              onClick={handleRightClick}
              buttonRef={setRightRef(word)}
            />
          ))}
        </div>

        <ConnectionLines
          connections={connections}
          buttonPositions={buttonPositions}
          selectedLeft={selectedLeft}
          selectedRight={selectedRight}
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
