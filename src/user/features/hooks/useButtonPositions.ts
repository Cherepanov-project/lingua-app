import { useState, useCallback, useRef, useEffect } from "react";
import type { ButtonPositions, Position } from "../../../types/matchGame";

export function useButtonPositions() {
  const [buttonPositions, setButtonPositions] = useState<ButtonPositions>({
    russian: {},
    english: {},
  });

  const russianRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const englishRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const setRussianRef = useCallback(
    (word: string) => (el: HTMLButtonElement | null) => {
      russianRefs.current[word] = el;
    },
    []
  );

  const setEnglishRef = useCallback(
    (word: string) => (el: HTMLButtonElement | null) => {
      englishRefs.current[word] = el;
    },
    []
  );

  const updateButtonPositions = useCallback(() => {
    const gameContainer = gameContainerRef.current;
    if (!gameContainer) return;

    const containerRect = gameContainer.getBoundingClientRect();

    const russianPositions: Record<string, Position> = {};
    const englishPositions: Record<string, Position> = {};

    Object.entries(russianRefs.current).forEach(([word, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        russianPositions[word] = {
          x: rect.right - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    Object.entries(englishRefs.current).forEach(([word, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        englishPositions[word] = {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        };
      }
    });

    setButtonPositions({
      russian: russianPositions,
      english: englishPositions,
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
    setRussianRef,
    setEnglishRef,
    updateButtonPositions,
  };
}
