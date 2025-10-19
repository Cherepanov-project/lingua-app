import {
  Box,
  Stack,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {mockListeningExercises} from "../../Profile/mockDataSlider.ts";
import {exercises, quizStack, sendAnswer} from "./listeningConst.ts";

export const QuizPage = () => {
  const {id} = useParams<{ id: string }>();
  const exercise = mockListeningExercises.find((ex) => ex.id === id);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!exercise) {
    return <Typography>Упражнение не найдено</Typography>;
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    alert("Ответы отправлены!");
    exercise.progress = 100;
  };

  return (
    <Stack
      sx={quizStack}
    >
      <Typography variant="h4">{exercises}: {exercise.name}</Typography>
      <audio
        controls
        src={exercise.audioUrl}
        style={{margin: "20px 0"}}
      />
      <Stack
        spacing={3}
        sx={{width: "80%", maxWidth: "1200px"}}
      >
        {exercise.questions.map((q, index) => (
          <Box key={index}>
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
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </Stack>
      <Button
        sx={{marginTop: "20px", borderRadius: "3rem"}}
        variant="contained"
        onClick={handleSubmit}
      >
        {sendAnswer}
      </Button>
    </Stack>
  );
};