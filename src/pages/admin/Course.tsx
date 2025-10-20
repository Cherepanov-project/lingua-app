import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Box, Stack, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { CourseModule } from "../../shared/types/module";
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
  const currentCourse = courses.find((course: Course) => course.id === Number(id));

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
        id: crypto.randomUUID(),
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

  const handleBlur = () => {
    if (!newModule.trim()) {
      setAdding(false);
    } else {
      handleSaveModule();
    }
  };

  return (
    <Box
      sx={{
        padding: "37px 58px",
      }}
    >
      <Button component={Link} to={`/courses`}>
        <ArrowBackIcon /> <h2>{` Все курсы`}</h2>
      </Button>
      {isLoading ? (
        <h2>Загрузка...</h2>
      ) : currentCourse ? (
        <>
          <h1>{`${currentCourse.language} – ${currentCourse.level}`}</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Модули</h2>
            <Button className="addButton" onClick={handleAddModule}>
              <AddIcon /> Добавить модуль
            </Button>
          </Box>
          <Stack spacing={2}>
            {courseModules.map((mod: CourseModule) => (
              <Paper sx={{ padding: "10px 5px" }} key={mod.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{mod.name}</div>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      onClick={() => navigate(`/course/${id}/module/${mod.id}`)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button onClick={() => handleDeleteModule(mod.id)}>
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </Box>{" "}
                </Box>
              </Paper>
            ))}
            {adding && (
              <Paper style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TextField
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveModule()}
                  autoFocus
                  placeholder="Название модуля"
                  fullWidth
                />
              </Paper>
            )}
          </Stack>
        </>
      ) : (
        <h2>Курс не найден</h2>
      )}
    </Box>
  );
}
