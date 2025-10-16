import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../shared/hooks/redux";
import { useGetStatementsByLevelQuery } from "../../../../../shared/api/truthOrLieGameApi";
import {
  setAllStatementsByLevel,
  setCurrentLevel,
  resetCurrentLevel,
  setCurrentStatements,
  setHealth,
  setLevelCompleted,
  setUserSelection,
  setIsOpenModal,
} from "../../../../../store/reducers/TruthOrLieSlice";

export const useTruthOrLie = () => {
  const dispatch = useAppDispatch();

  const currentLevel = useAppSelector((state) => state.truthOrLie.currentLevel);
  const currentStatement = useAppSelector((state) => state.truthOrLie.currentStatement);
  const userSelection = useAppSelector((state) => state.truthOrLie.userSelection);
  const isLevelCompleted = useAppSelector((state) => state.truthOrLie.isLevelCompleted);

  const { data: statements, isLoading } = useGetStatementsByLevelQuery(currentLevel);

  useEffect(() => {
    if (!statements) return;
    dispatch(setAllStatementsByLevel({ statements }));
    dispatch(setCurrentStatements({ statement: statements[0] }));
  }, [statements, dispatch, currentLevel]);

  const handleSelect = (variant: "Правда" | "Ложь") => {
    if (!statements || !currentStatement) return;

    if (
      (variant === "Правда" && currentStatement.correctValue === false) ||
      (variant === "Ложь" && currentStatement.correctValue === true)
    ) {
      dispatch(setHealth());
    }

    const currentIndex = statements.findIndex((item) => item.id === currentStatement.id);

    dispatch(setUserSelection({ variant: variant, currentStatement }));

    if (currentIndex < statements.length - 1) {
      const nextIndex = currentIndex + 1;

      dispatch(setCurrentStatements({ statement: statements[nextIndex] }));
    } else {
      dispatch(setLevelCompleted());
    }
  };

  const nextLevel = () => {
    if (currentLevel < 10) {
      dispatch(setCurrentLevel({ level: currentLevel + 1 }));
    }
  };

  const restart = () => {
    dispatch(resetCurrentLevel({ level: currentLevel + 1 }));

    setTimeout(() => {
      dispatch(setCurrentLevel({ level: currentLevel }));
    }, 0);
  };

  const showModal = () => {
    dispatch(setIsOpenModal(true));
  };

  const closeModal = () => {
    dispatch(setIsOpenModal(false));
  };

  return {
    currentStatement,
    currentLevel,
    isLoading,
    userSelection,
    isLevelCompleted,
    handleSelect,
    nextLevel,
    restart,
    showModal,
    closeModal,
  };
};
