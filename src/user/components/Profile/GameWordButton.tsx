import { memo } from "react";
import type { WordType, WordStatus } from "../../../types/matchGame";
import { COLORS, BUTTON_STYLES } from "../../../shared/constants/matchGame";

interface WordButtonProps {
  word: string;
  type: WordType;
  status: WordStatus;
  isWrongSelection: boolean;
  onClick: (word: string) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

export const WordButton = memo<WordButtonProps>(
  ({ word, type, status, isWrongSelection, onClick, buttonRef }) => {
    const getBackgroundColor = () => {
      if (status === "selected") {
        return isWrongSelection
          ? COLORS.ERROR
          : type === "left"
            ? COLORS.LEFT_SELECTED
            : COLORS.RIGHT_SELECTED;
      }

      if (status === "connected") {
        return type === "left"
          ? COLORS.LEFT_SELECTED
          : COLORS.RIGHT_SELECTED;
      }

      return "white";
    };

    const getHoverColor = () => {
      if (isWrongSelection) return COLORS.ERROR;
      return type === "left" ? COLORS.LEFT_SELECTED : COLORS.RIGHT_SELECTED;
    };

    return (
      <button
        ref={buttonRef}
        onClick={() => onClick(word)}
        style={{
          backgroundColor: getBackgroundColor(),
          border: "none",
          cursor: "pointer",
          color: "inherit",
          fontFamily: "inherit",
          ...BUTTON_STYLES.WORD,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = getHoverColor();
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = getBackgroundColor();
        }}
      >
        {word}
      </button>
    );
  }
);

WordButton.displayName = "WordButton";
