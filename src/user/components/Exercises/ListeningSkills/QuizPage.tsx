import { Box, Stack, Typography, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockListeningExercises } from "../../Profile/mockDataSlider.ts";

export const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const exercise = mockListeningExercises.find((ex) => ex.id === id);
  const [answers, setAnswers] = useState<string[]>([]); // Для хранения ответов

  if (!exercise) {
    return <Typography>Упражнение не найдено</Typography>;
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Логика проверки ответов (mock). В реальности - обновить progress в backend/localStorage
    alert("Ответы отправлены!");
    // Например, обновить progress в mock (для demo)
    exercise.progress = 100;
  };

  return (
    <Stack
      sx={{
        padding: "70px",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Упражнение: {exercise.name}</Typography>
      <audio controls src={exercise.audioUrl} style={{ margin: "20px 0" }}>
        Ваш браузер не поддерживает аудио.
      </audio>
      <Stack spacing={3} sx={{ width: "80%" }}>
        {exercise.questions.map((q, index) => (
          <Box key={index}>
            <Typography variant="h6">{q.question}</Typography>
            <RadioGroup value={answers[index] || ""} onChange={(e) => handleAnswerChange(index, e.target.value)}>
              {q.options.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </Stack>
      <Button sx={{ marginTop: "20px", borderRadius: "3rem" }} variant="contained" onClick={handleSubmit}>
        Отправить ответы
      </Button>
    </Stack>
  );
};