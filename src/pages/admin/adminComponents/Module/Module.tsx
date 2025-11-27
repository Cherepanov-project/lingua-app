import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { stylesObj } from "../../../../user/stylesObj";
import { useEffect, useState } from "react";
import AddLessonSelect from "./AddLeassonsSelect";
import {
  useDeleteModuleMutation,
  useGetLessonsQuery,
  useGetModulesQuery,
  useUpdateModuleMutation,
} from "../../../../shared/api/languagesApi";
import type { Lesson } from "../../../../shared/types/lesson";
import AddGrammarSelect from "./AddGrammarSelect";
import { useGetRulesQuery } from "../../../../shared/api/grammarApi";
import type { Grammar } from "../../../../types/grammar";
import { GrammarCard } from "./GrammarCard";
import { Notification } from "../../../../shared/components/Notification";
import { LessonCard } from "../Lesson/LessonCard";
import { GridDeleteIcon } from "@mui/x-data-grid";

export default function Module() {
  const navigate = useNavigate();
  const { id, moduleid } = useParams();
  const { data: modules } = useGetModulesQuery();
  const { data: allLessons } = useGetLessonsQuery();
  const { data: allGrammar } = useGetRulesQuery();
  const [updateModuleMutation] = useUpdateModuleMutation();
  const [deleteModuleMutation] = useDeleteModuleMutation();
  const [lessons, setLeassons] = useState<string[]>([]);
  const currentModule = modules?.find((m) => moduleid === m.id);
  const [lessonInModule, setLessonInModule] = useState<Lesson[]>([]);

  useEffect(() => {
    if (currentModule && allLessons) {
      setLessonInModule(
        allLessons.filter((l) => currentModule.lessons.includes(String(l.id)))
      );
    }
  }, [currentModule, allLessons]);

  useEffect(() => {
    if (currentModule && allGrammar) {
      setgrammarInModule(
        allGrammar.filter((l) => currentModule.grammar.includes(String(l.id)))
      );
    }
  }, [currentModule, allGrammar]);
  const [grammar, setGrammar] = useState<string[]>([]);
  const [grammarInModule, setgrammarInModule] = useState<Grammar[]>([]);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState(false);

  const hanndleAddLesson = () => {
    if (!allLessons) return;
    const newLessonObjects = allLessons.filter((l) =>
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
      await updateModuleMutation({
        id: moduleid,
        name: currentModule?.name,
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

  const hanndleDeleate = () => {
    deleteModuleMutation(moduleid);
    setdeleteSuccess(true);
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
        {publishError && (
          <Notification
            message={publishError}
            open={!!publishError}
            onClose={() => setPublishError("")}
          ></Notification>
        )}
        <Stack spacing={4} sx={{ margin: "20px 140px" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ ...stylesObj.courseButton, width: "240px" }}
          >
            Вернуться к курсу
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">{currentModule?.name}</Typography>
              <Button
                startIcon={<GridDeleteIcon />}
                onClick={hanndleDeleate}
                sx={{
                  ...stylesObj.courseButton,
                  width: "240px",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "#ef5555ff",
                  },
                }}
              >
                Удалить модуль
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
                  sx={{ ...stylesObj.courseButton, width: "190px" }}
                >
                  Добавить уроки
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/admin/course/${id}/${moduleid}/new-lesson`)
                  }
                  sx={{ ...stylesObj.courseButton, width: "190px" }}
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
                  sx={{ ...stylesObj.courseButton, width: "220px" }}
                >
                  Добавить грамматику
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setPublishSuccess(false)}>
          Модуль cохранён!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={() => setPublishSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setdeleteSuccess(false)}>
          Модуль удален!
        </Alert>
      </Snackbar>
    </>
  );
}
