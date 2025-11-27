import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { stylesObj } from "../../../../user/stylesObj";
import {
  useDeleteLessonMutation,
  useGetLessonsQuery,
} from "../../../../shared/api/languagesApi";
import { useGetListeningExercisesQuery } from "../../../../shared/api/listeningApi";
import { Card } from "./Card";
import { useGetGrammarExercisesQuery } from "../../../../shared/api/grammarExercisesApi";
import { useGetOrthographyExerciseQuery } from "../../../../shared/api/orthographyjApi";
import { useGetNewWordsQuery } from "../../../../shared/api/newWordsApi";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useState } from "react";

export default function Lesson() {
  const { lessonId } = useParams();
  const { data: allLessons } = useGetLessonsQuery();
  const [deleteLesson] = useDeleteLessonMutation();
  const [deleteSucess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const { data: allGrammar } = useGetGrammarExercisesQuery();
  const { data: allAudio } = useGetListeningExercisesQuery();
  const { data: allOrthography } = useGetOrthographyExerciseQuery();
  const { data: allWords } = useGetNewWordsQuery();

  const currentLesson = allLessons?.find((lesson) => lesson.id === lessonId);
  const currentGrammar = allGrammar?.filter((grammar) =>
    currentLesson?.grammar_exercises.includes(String(grammar.id))
  );
  const currentAudio = allAudio?.filter((audio) =>
    currentLesson?.listening.includes(String(audio.id))
  );
  const currentOrthography = allOrthography?.filter((orth) =>
    currentLesson?.orthography.includes(String(orth.id))
  );
  const currentWords = allWords?.filter((word) =>
    currentLesson?.newWords.includes(String(word.id))
  );

  const hanndleDelete = () => {
    deleteLesson(lessonId);
    setDeleteSuccess(true);
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Stack spacing={3} sx={{ margin: "20px 140px" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ ...stylesObj.courseButton, width: "240px" }}
          >
            Вернуться к модулю
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h2">{currentLesson?.name}</Typography>
              <Button
                startIcon={<GridDeleteIcon />}
                onClick={hanndleDelete}
                sx={{
                  ...stylesObj.courseButton,
                  width: "240px",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "#ef5555ff",
                  },
                }}
              >
                Удалить урок
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Аудирование</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              overflowX: "auto",
              whiteSpace: "nowrap",
              padding: "10px",
            }}
          >
            {currentAudio?.map((lesson) => (
              <Card key={lesson.id} item={lesson} title="name"></Card>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Упражнения</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              overflowX: "auto",
              whiteSpace: "nowrap",
              padding: "10px",
            }}
          >
            {currentGrammar?.map((lesson) => (
              <Card key={lesson.id} item={lesson} title="sentence"></Card>
            ))}
          </Box>{" "}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Орфография</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              overflowX: "auto",
              whiteSpace: "nowrap",
              padding: "10px",
            }}
          >
            {currentOrthography?.map((lesson) => (
              <Card key={lesson.id} item={lesson} title="word"></Card>
            ))}
          </Box>{" "}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Новые слова</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              overflowX: "auto",
              whiteSpace: "nowrap",
              padding: "10px",
            }}
          >
            {currentWords?.map((word) => (
              <Card key={word.id} item={word} title="title"></Card>
            ))}
          </Box>
          <Snackbar
            open={deleteSucess}
            autoHideDuration={3000}
            onClose={() => setDeleteSuccess(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success" onClose={() => setDeleteSuccess(false)}>
              Урок удален!
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </>
  );
}
