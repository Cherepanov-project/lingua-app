import { Link, useParams, useNavigate } from "react-router-dom";
import type { CourseModule } from "../../shared/types/module";
import type { Lesson } from "../../shared/types/lesson";
import { TextField, Button, Box, Stack, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useGetModulesQuery,
  useUpdateLessonsInModuleMutation,
  useGetLessonsQuery,
  useAddLessonMutation,
  useDeleteLessonMutation,
} from "../../shared/api/languagesApi";
import { useState } from "react";

export default function EditModule() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const { data: modules = [], isLoading } = useGetModulesQuery({});
  const { data: lessons = [] } = useGetLessonsQuery({});

  const [updateLessonsInModule] = useUpdateLessonsInModuleMutation();
  const [addLesson] = useAddLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const currentCourseModule = modules.find(
    (mod: CourseModule) => mod.id === moduleId
  );

  const currentLessons = lessons.filter((lesson: Lesson) =>
    currentCourseModule.lessons.includes(lesson.id)
  );

  const [adding, setAdding] = useState(false);
  const [newLesson, setNewLesson] = useState("");

  const handleAddLesson = () => {
    setAdding(true);
    setNewLesson("");
  };

  const handleSaveLesson = async () => {
    if (newLesson.trim()) {
      const addedLesson = {
        name: newLesson,
        exercises: [],
      };
      const result = await addLesson(addedLesson).unwrap();
      const updatedLessonIds = [...currentCourseModule.lessons, result.id];
      await updateLessonsInModule({ id: moduleId, lessons: updatedLessonIds });

      setAdding(false);
      setNewLesson("");
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    const updatedLessonIds = currentCourseModule.lessons.filter(
      (id: string) => id !== lessonId
    );
    await updateLessonsInModule({ id: moduleId, lessons: updatedLessonIds });
    await deleteLesson(lessonId);
  };

  const handleBlur = () => {
    if (!newLesson.trim()) {
      setAdding(false);
    } else {
      handleSaveLesson();
    }
  };

  return (
    <Box
      sx={{
        padding: "37px 58px",
      }}
    >
      <Button component={Link} to={`/course/${courseId}`}>
        <ArrowBackIcon /> <h2>{`Вернуться к курсу`}</h2>
      </Button>
      <h1>{currentCourseModule?.name}</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Уроки</h2>
        <Button className="addButton" onClick={handleAddLesson}>
          <AddIcon /> Добавить урок
        </Button>
      </Box>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <Stack spacing={2}>
          {currentLessons.map((lesson: Lesson) => (
            <Paper sx={{ padding: "10px 5px" }} key={lesson.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>{lesson.name}</h3>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={() =>
                      navigate(
                        `/course/${courseId}/module/${moduleId}/lesson/${lesson.id}`
                      )
                    }
                  >
                    <EditIcon style={{ display: "block" }} fontSize="small" />
                  </Button>
                  <Button onClick={() => handleDeleteLesson(lesson.id)}>
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Box>{" "}
              </Box>
            </Paper>
          ))}
          {adding && (
            <Paper sx={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TextField
                value={newLesson}
                onChange={(e) => setNewLesson(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && handleSaveLesson()}
                autoFocus
                placeholder="Название урока"
                fullWidth
              />
            </Paper>
          )}
        </Stack>
      )}
    </Box>
  );
}
