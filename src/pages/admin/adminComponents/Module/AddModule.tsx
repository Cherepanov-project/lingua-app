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
import AddLessonSelect from "./AddLeassonsSelect";
import {
  useAddModuleMutation,
  useGetLessonsQuery,
} from "../../../../shared/api/languagesApi";
import type { Lesson } from "../../../../shared/types/lesson";
import AddGrammarSelect from "./AddGrammarSelect";
import { useGetRulesQuery } from "../../../../shared/api/grammarApi";
import type { Grammar } from "../../../../types/grammar";
import { GrammarCard } from "./GrammarCard";
import { Notification } from "../../../../shared/components/Notification";
import { LessonCard } from "../Lesson/LessonCard";

export default function AddModule() {
  const navigate = useNavigate();
  const { data: allLessons } = useGetLessonsQuery();
  const { data: allGrammar } = useGetRulesQuery();
  const [publishModule] = useAddModuleMutation();

  const [moduleName, setModuleName] = useState("");

  const [lessons, setLeassons] = useState<string[]>([]);
  const [lessonInModule, setLessonInModule] = useState<Lesson[]>([]);
  const [grammar, setGrammar] = useState<string[]>([]);
  const [grammarInModule, setgrammarInModule] = useState<Grammar[]>([]);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState(false);

  const hanndleAddLesson = () => {
    if (!allLessons) return;

    const newLessonObjects = allLessons?.filter((l) =>
      lessons.includes(String(l.id))
    );

    const updatedLesson = [
      ...lessonInModule,
      ...newLessonObjects.filter(
        (lesson) =>
          !lessonInModule.some((existing) => existing.id === lesson.id)
      ),
    ];

    setLessonInModule(updatedLesson);
  };

  const hanndleAddGrammar = () => {
    if (!allGrammar) return;

    const newGrannarObjects = allGrammar?.filter((gramm) =>
      grammar.includes(gramm.id)
    );

    const updateGrammar = [
      ...grammarInModule,
      ...newGrannarObjects.filter(
        (grammar) =>
          !grammarInModule.some((existing) => existing.id === grammar.id)
      ),
    ];

    setgrammarInModule(updateGrammar);
  };

  const hanndlePublishModule = async () => {
    try {
      await publishModule({
        name: moduleName,
        lessons: lessonInModule.map((l) => String(l.id)),
        grammar: grammarInModule.map((g) => String(g.id)),
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
          ></Notification>
        )}
        <Stack spacing={3} sx={{ margin: "20px 140px" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ ...stylesObj.courseButton, width: "240px" }}
          >
            Вернуться к курсу
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3">Новый модуль</Typography>
            <TextField
              sx={{ width: "500px" }}
              id="outlined-basic"
              variant="outlined"
              label="Название модуля"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
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
              <Typography variant="h3">Уроки</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddLessonSelect
                  selectModules={lessons}
                  setSelectModules={setLeassons}
                />
                <Button
                  onClick={hanndleAddLesson}
                  sx={{ ...stylesObj.courseButton, width: "150px" }}
                >
                  Добавить
                </Button>
                <Button
                  onClick={() => navigate("/admin/course/new-lesson")}
                  sx={{ ...stylesObj.courseButton, width: "150px" }}
                >
                  Создать урок
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
            {lessonInModule.map((lesson) => (
              <LessonCard key={lesson.id} item={lesson}></LessonCard>
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
              <Typography variant="h3">Грамматика</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <AddGrammarSelect
                  selectModules={grammar}
                  setSelectModules={setGrammar}
                ></AddGrammarSelect>
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
            {grammarInModule.map((grammar) => (
              <GrammarCard key={grammar.id} item={grammar} />
            ))}
          </Box>
          <Button
            onClick={hanndlePublishModule}
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
          Модуль создан!
        </Alert>
      </Snackbar>
    </>
  );
}
