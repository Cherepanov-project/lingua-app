import { Link, useParams, useNavigate } from "react-router-dom";
import type { CourseModule } from "../../shared/types/module";
import type { Lesson } from "../../shared/types/lesson";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetModulesQuery,
  useUpdateLessonsInModuleMutation,
  useGetLessonsQuery,
  useAddLessonMutation,
  useDeleteLessonMutation,
} from "../../shared/api/languagesApi";
import { useState } from "react";
import "../../shared/styles/Courses.css";

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

  return (
    <div className="coursesPage">
      <Link to={`/course/${courseId}`}>
        <h2>{`< Вернуться к курсу`}</h2>
      </Link>
      <h1>{currentCourseModule?.name}</h1>

      <div className="moduleLessons">
        <h2>Уроки</h2>
        <Button className="addButton" onClick={handleAddLesson}>
          <AddIcon /> Добавить урок
        </Button>
      </div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <ul className="lessonsList">
          {currentLessons.map((lesson: Lesson) => (
            <li key={lesson.id}>
              <div className="moduleItem">
                <h3>{lesson.name}</h3>
                <div className="moduleIcons">
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
                </div>{" "}
              </div>
            </li>
          ))}
          {adding && (
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <TextField
                value={newLesson}
                onChange={(e) => setNewLesson(e.target.value)}
                onBlur={handleSaveLesson}
                autoFocus
                placeholder="Название модуля"
                fullWidth
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
