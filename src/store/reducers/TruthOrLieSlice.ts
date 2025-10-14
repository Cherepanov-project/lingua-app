import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Statement, UserSelection } from "../../user/components/Games/types/truthOrLie";

interface TruthOrLieState {
  health: number;
  currentLevel: number;
  allStatementsByLevel: Statement[] | undefined;
  currentStatement: Statement | undefined;
  userSelection: UserSelection[];
  isLevelCompleted: boolean;
  isOpenModal: boolean;
}

const initialState: TruthOrLieState = {
  health: 3,
  currentLevel: 1,
  allStatementsByLevel: undefined,
  currentStatement: undefined,
  userSelection: [],
  isLevelCompleted: false,
  isOpenModal: false,
};

const truthOrLieSlice = createSlice({
  name: "truthOrLie",
  initialState,
  reducers: {
    setHealth(state) {
      if (state.health > 0) state.health--;
    },

    setCurrentLevel(state, action: PayloadAction<{ level: number }>) {
      state.currentStatement = undefined;
      state.allStatementsByLevel = undefined;

      state.userSelection = [];
      state.isLevelCompleted = false;
      state.currentLevel = action.payload.level;
    },

    resetCurrentLevel(state, action: PayloadAction<{ level: number }>) {
      state.currentLevel = action.payload.level;
      state.allStatementsByLevel = undefined;
      state.currentStatement = undefined;
      state.userSelection = [];
      state.isLevelCompleted = false;
    },

    setAllStatementsByLevel(state, action: PayloadAction<{ statements: Statement[] }>) {
      state.allStatementsByLevel = action.payload.statements;
    },

    setCurrentStatements(state, action: PayloadAction<{ statement: Statement }>) {
      state.currentStatement = action.payload.statement;
    },

    setUserSelection(state, action: PayloadAction<{ variant: "Правда" | "Ложь"; currentStatement: Statement }>) {
      state.userSelection.push({ ...action.payload.currentStatement, userAnswer: action.payload.variant });
    },

    setLevelCompleted(state) {
      state.isLevelCompleted = true;
    },

    setIsOpenModal(state, action: PayloadAction<boolean>) {
      state.isOpenModal = action.payload;
    },
  },
});

export const {
  setHealth,
  setCurrentLevel,
  resetCurrentLevel,
  setAllStatementsByLevel,
  setCurrentStatements,
  setUserSelection,
  setLevelCompleted,
  setIsOpenModal,
} = truthOrLieSlice.actions;

export default truthOrLieSlice.reducer;
