import { useEffect, useRef, useState } from 'react';
import { type OrthographyExercise } from '../../../../shared/api/orthographyjApi';

export const useOrthography = (orthographyData?: OrthographyExercise[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOrthographyData, setCurrentOrthographyData] = useState<OrthographyExercise | undefined>();
  const [currentWord, setCurrentWord] = useState<string[] | undefined>();
  const [answers, setAnswers] = useState<string[]>([]);
  const [wrongIndexes, setWrongIndexes] = useState<number[]>([]);
  const [wordCorrect, setWordCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const checkButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const wordTransform = (word?: string) => {
    if (!word) return;

    const chars = word.split('');
    const idx1 = Math.floor(Math.random() * word.length);
    let idx2: number;
    do {
      idx2 = Math.floor(Math.random() * word.length);
    } while (idx2 === idx1);

    return chars.map((char, index) => (index === idx1 || index === idx2 ? '' : char));
  };

  useEffect(() => {
    if (!orthographyData?.length) return;

    const item = orthographyData[currentIndex];
    setCurrentOrthographyData(item);

    const transformed = wordTransform(item.word);
    setCurrentWord(transformed);
    setAnswers(transformed ? [...transformed] : []);
    setWrongIndexes([]);
    setWordCorrect(false);
  }, [orthographyData, currentIndex]);

  useEffect(() => {
    if (!currentWord) return;

    inputRefs.current = [];
    const firstEmptyIndex = currentWord.findIndex((ch) => ch === '');
    if (firstEmptyIndex !== -1) {
      setTimeout(() => inputRefs.current[firstEmptyIndex]?.focus(), 50);
    }
  }, [currentWord]);

  useEffect(() => {
    if (wordCorrect) {
      nextButtonRef.current?.focus();
    }
  }, [wordCorrect]);

  const checkAnswer = () => {
    if (!orthographyData) return;

    const original = orthographyData[currentIndex].word.split('');
    const wrong: number[] = [];

    answers.forEach((char, idx) => {
      if (char !== original[idx]) wrong.push(idx);
    });

    setWrongIndexes(wrong);
    const ok = wrong.length === 0;
    setWordCorrect(ok);

    if (!ok && wrong[0] !== undefined) {
      setTimeout(() => inputRefs.current[wrong[0]]?.focus(), 50);
    }
  };

  const nextWord = () => {
    if (!orthographyData) return;
    if (currentIndex < orthographyData.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    currentWord?: string[]
  ) => {
    const value = e.target.value;
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setWrongIndexes([]);
    setWordCorrect(false);

    if (value) {
      const nextEmptyIndex = currentWord?.findIndex((ch, i) => i > index && ch === '');
      if (nextEmptyIndex !== undefined && nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        checkButtonRef.current?.focus();
      }
    }
  };

  return {
    currentOrthographyData,
    currentWord,
    currentIndex,
    answers,
    setAnswers,
    wrongIndexes,
    wordCorrect,
    showAnswer,
    setShowAnswer,
    checkAnswer,
    nextWord,
    inputRefs,
    checkButtonRef,
    nextButtonRef,
    handleInputChange,
  };
};
