import { useState, useCallback, useRef, useEffect } from "react";
import type { ButtonPositions, Position } from "../../../types/matchGame";

export function useButtonPositions() {
  const [buttonPositions, setButtonPositions] = useState<ButtonPositions>({
    left: {},
    right: {},
  });

  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const setLeftRef = useCallback(
    (word: string) => (el: HTMLButtonElement | null) => {
      leftRefs.current[word] = el;
    },
    []
  );

  const setRightRef = useCallback(
    (word: string) => (el: HTMLButtonElement | null) => {
      rightRefs.current[word] = el;
    },
    []
  );

  const updateButtonPositions = useCallback(() => {
    const gameContainer = gameContainerRef.current;
    if (!gameContainer) return;

    const containerRect = gameContainer.getBoundingClientRect();

    const leftPositions: Record<string, Position> = {};
    const rightPositions: Record<string, Position> = {};

    Object.entries(leftRefs.current).forEach(([word, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        leftPositions[word] = {
          x: rect.right - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    Object.entries(rightRefs.current).forEach(([word, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        rightPositions[word] = {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    setButtonPositions({
      left: leftPositions,
      right: rightPositions,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateButtonPositions, 100);
    return () => clearTimeout(timer);
  }, [updateButtonPositions]);

  useEffect(() => {
    window.addEventListener("resize", updateButtonPositions);
    return () => window.removeEventListener("resize", updateButtonPositions);
  }, [updateButtonPositions]);

  return {
    buttonPositions,
    gameContainerRef,
    setLeftRef,
    setRightRef,
    updateButtonPositions,
  };
}
