import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { stylesObj } from "../../../../user/stylesObj";
import { useState } from "react";
import { useAddLessonMutation } from "../../../../shared/api/languagesApi";
import { Notification } from "../../../../shared/components/Notification";

import { useGetListeningExercisesQuery } from "../../../../shared/api/listeningApi";
import AddSelect from "./AddSelect";
import type { ListeningExercise } from "../../../../shared/types/listening";
import { Card } from "./Card";
import { useGetGrammarExercisesQuery } from "../../../../shared/api/grammarExercisesApi";
import type { TGrammarExercise } from "../../../../types/grammarExercises";
import {
  useGetOrthographyExerciseQuery,
  type OrthographyExercise,
} from "../../../../shared/api/orthographyjApi";
import {
  useGetNewWordsQuery,
  type Topic,
} from "../../../../shared/api/newWordsApi";

export default function AddLesson() {
  const navigate = useNavigate();

  const { data: allGrammar } = useGetGrammarExercisesQuery();
  const { data: allAudio } = useGetListeningExercisesQuery();
  const { data: allOrthography } = useGetOrthographyExerciseQuery();
  const { data: allWords } = useGetNewWordsQuery();
  const [publishLesson] = useAddLessonMutation();

  const [lessonName, setLessonName] = useState("");
  const [grammar, setGrammar] = useState<string[]>([]);
  const [grammarInModule, setgrammarInModule] = useState<TGrammarExercise[]>(
    []
  );
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [audio, setAudio] = useState<string[]>([]);
  const [audioInLesson, setAudioInLesson] = useState<ListeningExercise[]>([]);
  const [orthography, setOrthography] = useState<string[]>([]);
  const [orthographyInLesson, setOrthographyInLesson] = useState<
    OrthographyExercise[]
  >([]);
  const [words, setWords] = useState<string[]>([]);
  const [wordsInLesson, setWordsInLesson] = useState<Topic[]>([]);

  const hanndleAddLesson = () => {
    if (!allAudio) return;

    const newAudioObjects = allAudio?.filter((a) =>
      audio.includes(String(a.id))
    );

    const updatedAudio = [
      ...audioInLesson,
      ...newAudioObjects.filter(
        (audio) => !audioInLesson.some((existing) => existing.id === audio.id)
      ),
    ];

    setAudioInLesson(updatedAudio);
  };

  const hanndleAddGrammar = () => {
    if (!allGrammar) return;

    const newGrannarObjects = allGrammar?.filter((gramm) =>
      grammar.includes(String(gramm.id))
    );

    const updateGrammar = [
      ...grammarInModule,
      ...newGrannarObjects.filter(
        (gramm) => !grammarInModule.some((existing) => existing.id === gramm.id)
      ),
    ];

    setgrammarInModule(updateGrammar);
  };

  const hanndleAddOrthography = () => {
    if (!allOrthography) return;

    const newOrthographyObjects = allOrthography?.filter((orth) =>
      orthography.includes(String(orth.id))
    );

    const updateOrthorgraphy = [
      ...orthographyInLesson,
      ...newOrthographyObjects.filter(
        (orthorgraphy) =>
          !orthographyInLesson.some(
            (existing) => existing.id === orthorgraphy.id
          )
      ),
    ];

    setOrthographyInLesson(updateOrthorgraphy);
  };

  const hanndleAddWords = () => {
    if (!allWords) return;

    const newWordsObjects = allWords?.filter((word) =>
      words.includes(String(word.id))
    );

    const updateWords = [
      ...wordsInLesson,
      ...newWordsObjects.filter(
        (word) => !wordsInLesson.some((existing) => existing.id === word.id)
      ),
    ];

    setWordsInLesson(updateWords);
  };

  const hanndlePublishLesson = async () => {
    try {
      await publishLesson({
        id: crypto.randomUUID(),
        name: lessonName,
        listening: audioInLesson.map((l) => String(l.id)),
        grammar_exercises: grammarInModule.map((l) => String(l.id)),
        orthography: orthographyInLesson.map((l) => String(l.id)),
        newWords: wordsInLesson.map((l) => String(l.id)),
        reading: [],
        exercises: [],
      }).unwrap();
      setPublishSuccess(true);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setPublishError(`Ошибка: ${message}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        {publishError && (
          <Notification
            message={publishError}
            open={!!publishError}
            onClose={() => setPublishError("")}
          />
        )}
        <Stack spacing={2} sx={{ margin: "20px 140px" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ ...stylesObj.courseButton, width: "240px" }}
          >
            Вернуться к модулю
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3">Новый урок</Typography>
            <TextField
              sx={{ width: "500px" }}
              id="outlined-basic"
              variant="outlined"
              label="Название урока"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
            />
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddSelect
                  selectModules={audio}
                  setSelectModules={setAudio}
                  description="Выбери аудирование"
                  useDataHook={useGetListeningExercisesQuery}
                  idField="id"
                  labelField="name"
                />
                <Button
                  onClick={hanndleAddLesson}
                  sx={{ ...stylesObj.courseButton, width: "150px" }}
                >
                  Добавить
                </Button>
              </Box>
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
            {audioInLesson.map((lesson) => (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddSelect
                  selectModules={grammar}
                  setSelectModules={setGrammar}
                  description="Выбери упражнение"
                  useDataHook={useGetGrammarExercisesQuery}
                  idField="id"
                  labelField="sentence"
                />
                <Button
                  onClick={hanndleAddGrammar}
                  sx={{ ...stylesObj.courseButton, width: "150px" }}
                >
                  Добавить
                </Button>
              </Box>
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
            {grammarInModule.map((lesson) => (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddSelect
                  selectModules={orthography}
                  setSelectModules={setOrthography}
                  description="Выбери офографию"
                  useDataHook={useGetOrthographyExerciseQuery}
                  idField="id"
                  labelField="word"
                />
                <Button
                  onClick={hanndleAddOrthography}
                  sx={{ ...stylesObj.courseButton, width: "150px" }}
                >
                  Добавить
                </Button>
              </Box>
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
            {orthographyInLesson.map((lesson) => (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddSelect
                  selectModules={words}
                  setSelectModules={setWords}
                  description="Выбери группу слов"
                  useDataHook={useGetNewWordsQuery}
                  idField="id"
                  labelField="title"
                />
                <Button
                  onClick={hanndleAddWords}
                  sx={{ ...stylesObj.courseButton, width: "150px" }}
                >
                  Добавить
                </Button>
              </Box>
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
            {wordsInLesson.map((word) => (
              <Card key={word.id} item={word} title="title"></Card>
            ))}
          </Box>
          <Button
            onClick={hanndlePublishLesson}
            sx={{ ...stylesObj.courseButton, width: "150px" }}
          >
            Сохранить
          </Button>
        </Stack>
      </Box>
      <Snackbar
        open={publishSuccess}
        autoHideDuration={3000}
        onClose={() => setPublishSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setPublishSuccess(false)}>
          Урок создан!
        </Alert>
      </Snackbar>
    </>
  );
}
