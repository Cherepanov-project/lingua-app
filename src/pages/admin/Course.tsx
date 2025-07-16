import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { CourseModule } from "../../shared/types/module";
import "../../shared/styles/Courses.css";
import {
  useGetCoursesQuery,
  useGetModulesQuery,
  useAddModuleMutation,
  useDeleteModuleMutation,
  useUpdateCourseModulesMutation,
} from "../../shared/api/languagesApi";
import type { Course } from "../../shared/types/course";

export default function Course() {
  const { id } = useParams();
  const { data: courses = [], isLoading } = useGetCoursesQuery({});
  const { data: modules = [] } = useGetModulesQuery({});
  const currentCourse = courses.find((course: Course) => course.id === id);

  const courseModules = modules.filter((mod: CourseModule) =>
    currentCourse.modules.includes(mod.id)
  );

  const [addModule] = useAddModuleMutation();
  const [updateCourseModules] = useUpdateCourseModulesMutation();
  const [deleteModule] = useDeleteModuleMutation();

  const [adding, setAdding] = useState(false);
  const [newModule, setNewModule] = useState("");

  const navigate = useNavigate();

  const handleAddModule = () => {
    setAdding(true);
    setNewModule("");
  };

  const handleSaveModule = async () => {
    if (newModule.trim()) {
      const newMod = {
        name: newModule,
        lessons: [],
      };
      const result = await addModule(newMod).unwrap();
      const updatedModuleIds = [...currentCourse.modules, result.id];
      await updateCourseModules({ id, modules: updatedModuleIds });

      setAdding(false);
      setNewModule("");
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    const updatedModuleIds = currentCourse.modules.filter(
      (id: string) => id !== moduleId
    );
    await updateCourseModules({ id, modules: updatedModuleIds });
    await deleteModule(moduleId);
  };

  return (
    <div className="coursesPage">
      <Link to={`/courses`}>
        <h2>{`< Все курсы`}</h2>
      </Link>
      {isLoading ? (
        <h2>Загрузка...</h2>
      ) : currentCourse ? (
        <>
          <h1>{`${currentCourse.language} – ${currentCourse.level}`}</h1>
          <div className="courseModules">
            <h2>Модули</h2>
            <Button className="addButton" onClick={handleAddModule}>
              <AddIcon /> Добавить модуль
            </Button>
          </div>
          <ul className="modulesList">
            {courseModules.map((mod: CourseModule) => (
              <li key={mod.id}>
                <div className="moduleItem">
                  <div>{mod.name}</div>
                  <div className="moduleIcons">
                    <Button
                      onClick={() => navigate(`/course/${id}/module/${mod.id}`)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => handleDeleteModule(mod.id)}>
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </div>{" "}
                </div>
              </li>
            ))}
            {adding && (
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TextField
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  onBlur={handleSaveModule}
                  autoFocus
                  placeholder="Название модуля"
                  fullWidth
                />
              </li>
            )}
          </ul>
        </>
      ) : (
        <h2>Курс не найден</h2>
      )}
    </div>
  );
}
