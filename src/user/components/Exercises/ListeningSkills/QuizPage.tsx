import {
  Stack,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {mockListeningExercises} from "../../Profile/mockDataSlider.ts";
import {
  cardStack,
  check, contin,
  exercises, incorrect,
  quizStack,
} from "./listeningConst.ts";



export const QuizPage = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exercise = mockListeningExercises.find((ex) => ex.id === id);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  if (!exercise) {
    return <Typography>Упражнение не найдено</Typography>;
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    const allCorrect = exercise.questions.every(
      (q, index) => answers[index] === q.correct)
    setIsCorrect(allCorrect);

    if (allCorrect) {
      exercise.progress = true;
    } else {
      setTimeout(() => {
        setAnswers([]);
        setIsCorrect(null);
        setResetTrigger((prev) => prev + 1);
      }, 1000)
    }
  }

  const handleContinue = () => {
    navigate('/profile/exercises/listening')
  }

  const isButtonDisabled = answers.length !== exercise.questions.length;

  return (
    <Stack sx={quizStack}>
      <Typography variant="h4">{exercises}: {exercise.name}</Typography>
      <audio controls src={exercise.audioUrl} style={{ margin: "20px 0" }} />
      <Stack spacing={3} sx={{ width: "80%", maxWidth: "1200px" }}>
        {exercise.questions.map((q, index) => {
          const isAnswerCorrect =
            isCorrect !== null && answers[index] === q.correct;
          const isAnswerIncorrect =
            isCorrect !== null && answers[index] && answers[index] !== q.correct;

          return (
            <Stack
              key={`${index}-${resetTrigger}`}
              sx={cardStack}
            >
              <Typography variant="h6">{q.question}</Typography>
              <RadioGroup
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              >
                {q.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={{
                      marginBottom: "10px",
                      backgroundColor:
                        isAnswerCorrect && option === answers[index]
                          ? "#c8e6c9"
                          : isAnswerIncorrect && option === answers[index]
                            ? "#ffcdd2"
                            : undefined,
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </RadioGroup>
            </Stack>
          );
        })}
      </Stack>
      <Button
        sx={{
          marginTop: "20px",
          padding: "0 20px",
          paddingInline: "40px",
          borderRadius: "3rem",
          color: "white",
          fontSize: "20px",
          textTransform: "capitalize",
          backgroundColor:
            isCorrect === true
              ? "#4caf50"
              : isCorrect === false
                ? "#f44336"
                : undefined,
           }}
        variant="contained"
        disabled={isButtonDisabled}
        onClick={isCorrect === true ? handleContinue : handleCheck}
      >
        {isCorrect === true
          ? contin
          : isCorrect === false
            ? incorrect
            : check}
      </Button>
    </Stack>
  );
};