import { useState } from "react";
import { RightWords, ErrWords } from "../../../../shared/constants/textConsts";

export const useGrammarExercise = (missing_words: string[]) => {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(missing_words.length).fill(''));
  const [isChecked, setIsChecked] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleCheck = () => {
    setIsChecked(true);
    const isCorrect = (index: number) =>
      userAnswers[index].trim().toLowerCase() === missing_words[index].toLowerCase();

    const allCorrect = missing_words.every(
      (_, i) => isCorrect(i) && userAnswers[i].trim() !== ''
    );

    setResult(allCorrect ? RightWords : ErrWords);
  };

  return {
    userAnswers,
    isChecked,
    result,
    handleChange,
    handleCheck,
  };
};
