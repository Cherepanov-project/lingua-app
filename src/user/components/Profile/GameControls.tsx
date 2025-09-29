import { memo } from "react";
import type { WordPair } from "../../../shared/constants/mockMatchGame";
import { COLORS, BUTTON_STYLES } from "../../../shared/constants/matchGame";

interface GameControlsProps {
  currentLevel: number;
  gameCompleted: boolean;
  showAnswers: boolean;
  currentLevelPairs: WordPair[];
  onShowAnswers: () => void;
  onRestart: () => void;
  onNextLevel: () => void;
}

export const GameControls = memo<GameControlsProps>(
  ({
    currentLevel,
    gameCompleted,
    showAnswers,
    currentLevelPairs,
    onShowAnswers,
    onRestart,
    onNextLevel,
  }) => {
    const maxLevel = 10;
    const isLastLevel = currentLevel >= maxLevel;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "72px",
            width: "100%",
          }}
        >
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => showAnswers && onShowAnswers()}
          >
            <button
              onClick={onShowAnswers}
              style={{
                ...BUTTON_STYLES.CONTROL,
                backgroundColor: showAnswers ? COLORS.SUCCESS : "#fff",
                color: showAnswers ? "white" : "#878787",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {showAnswers ? "Скрыть ответы" : "Показать ответы"}
            </button>
            {showAnswers && (
              <div
                style={{
                  position: "absolute",
                  bottom: "80px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  zIndex: 1000,
                }}
              >
                {currentLevelPairs.map((pair, index) => (
                  <div key={index}>
                    {pair.russian} - {pair.english}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onRestart}
            style={{
              ...BUTTON_STYLES.CONTROL,
              backgroundColor: "#fff",
              color: "#303030",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            Перезапустить
          </button>

          <button
            onClick={onNextLevel}
            disabled={!gameCompleted || isLastLevel}
            style={{
              ...BUTTON_STYLES.CONTROL,
              fontSize: 20,
              backgroundColor:
                gameCompleted && !isLastLevel
                  ? COLORS.NEXT_LEVEL
                  : COLORS.DISABLED,
              color: "#303030",
              border: "none",
              cursor: gameCompleted && !isLastLevel ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}
          >
            {isLastLevel ? "Игра завершена!" : "Следующий уровень"}
          </button>
        </div>

        <div
          style={{
            marginBottom: "24px",
            color: COLORS.TEXT_SECONDARY,
            marginTop: "20px",
            fontSize: 24,
          }}
        >
          <span style={{ fontWeight: "bold", color: COLORS.TEXT_PRIMARY }}>
            {currentLevel}/{maxLevel}
          </span>{" "}
          пройдено
        </div>
      </div>
    );
  }
);

GameControls.displayName = "GameControls";
