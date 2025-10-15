export const COLORS = {
  LEFT_SELECTED: "#FFD186",
  RIGHT_SELECTED: "#FF86C1",
  ERROR: "#ff6b6b",
  SUCCESS: "#4CAF50",
  SUCCESS_HOVER: "#45a049",
  NEXT_LEVEL: "#7E94F9",
  NEXT_LEVEL_HOVER: "#6B7FD7",
  DISABLED: "#ccc",
  TEXT_SECONDARY: "#878787",
  TEXT_PRIMARY: "#303030",
} as const;

export const MATCH_GAME_NAME = 'Соедини пары'

export const BUTTON_STYLES = {
  WORD: {
    height: 70,
    width: 400,
    borderRadius: 40,
    fontSize: 30,
    transition: "all 0.3s ease",
    position: "relative" as const,
    zIndex: 2,
  },
  CONTROL: {
    borderRadius: "50px",
    textTransform: "none" as const,
    fontSize: 24,
    padding: "10px 30px",
    width: 300,
    height: 70,
  },
} as const;

export const LAYOUT_STYLES = {
  WORDS_CONTAINER: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    width: "auto",
    height: "100%",
  },
  GAME_CONTAINER: {
    display: "flex",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    width: "100%",
    flexGrow: 1,
    margin: "16px 0",
    gap: "265px",
    position: "relative" as const,
    minHeight: "400px",
  },
} as const;
