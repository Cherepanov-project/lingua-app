import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { stylesObj } from "../../../../user/stylesObj";
import { ModuleCard } from "../Module/ModuleCard";
import { useEffect, useState } from "react";
import CoursesEditModal from "./CoursesEditModal";
import {
  useGetCourseByIdQuery,
  useGetModulesQuery,
  useUpdateCourseInfoMutation,
} from "../../../../shared/api/languagesApi";
import type { Course } from "../../../../shared/types/course";
import ModuleSelect from "../Module/AddModuleSelect";
import type { CourseModule } from "../../../../shared/types/module";
import { Notification } from "../../../../shared/components/Notification";

export default function Course() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { data } = useGetCourseByIdQuery(id);
  const [course, setCourse] = useState<Course | null>(null);
  const [udpateCourseInfo] = useUpdateCourseInfoMutation();
  const [selectModules, setSelectModules] = useState<string[]>([]);
  const { data: modules = [] } = useGetModulesQuery();
  const [courseModules, setCourseModules] = useState<CourseModule[]>([]);
  const [publishError, setPublishError] = useState("");
  const [publishSuccess, setPublishSuccess] = useState(false);
  useEffect(() => {
    if (!data || modules.length === 0) return;

    setCourse(data);

    const initialModules = modules.filter((m) => data.modules.includes(m.id));

    setCourseModules(initialModules);
  }, [data, modules]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleAddModule = () => {
    const newModulesObjects = modules.filter((m) =>
      selectModules.includes(m.id)
    );

    const updatedCourseModules = [
      ...courseModules,
      ...newModulesObjects.filter(
        (module) =>
          !courseModules.some((courseModule) => courseModule.id === module.id)
      ),
    ];

    setCourseModules(updatedCourseModules);
  };

  const handlePublish = async () => {
    try {
      await udpateCourseInfo({
        ...course,
        published: true,
      }).unwrap();
      setPublishSuccess(true);
      setTimeout(() => {
        navigate("/admin/course");
      }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setPublishError(`Ошибка: ${message}`);
    }
  };

  return (
    <>
      {publishError && (
        <Notification
          message={publishError}
          open={!!publishError}
          onClose={() => setPublishError("")}
        ></Notification>
      )}
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Stack spacing={4} sx={{ margin: "40px 140px" }}>
          {course && (
            <CoursesEditModal
              open={open}
              onClose={() => setOpen(false)}
              item={course}
              onSave={(updatedCourse: Course) => setCourse(updatedCourse)}
            />
          )}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ ...stylesObj.courseButton, width: "150px" }}
          >
            Все курсы
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">{course?.name}</Typography>
              <Button
                onClick={() => setOpen(true)}
                sx={{ ...stylesObj.courseButton, width: "150px" }}
              >
                Редактировать
              </Button>
            </Box>

            <Typography variant="h5" sx={{ color: "orange" }}>
              {course?.language} - {course?.level}
            </Typography>
            <Typography variant="h6" sx={{ color: "grey" }}>
              {course?.description}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">Модули</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <ModuleSelect
                  selectModules={selectModules}
                  setSelectModules={setSelectModules}
                />
                <Button
                  onClick={handleAddModule}
                  sx={{ ...stylesObj.courseButton, width: "180px" }}
                >
                  Добавить модули
                </Button>
                <Button
                  onClick={() => navigate("add-module")}
                  sx={{ ...stylesObj.courseButton, width: "180px" }}
                >
                  Создать модуль
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
            {courseModules.map((module) => (
              <ModuleCard key={module.id} item={module}></ModuleCard>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3">Оубликовать курс</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  id="publish-confirm"
                  name="publish-confirm"
                  checked={checked}
                  onChange={handleChange}
                />
              }
              label="Подтверждаю публикацию"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "25px",
              }}
            >
              <Button
                disabled={!checked}
                onClick={handlePublish}
                sx={{ ...stylesObj.courseButton, width: "150px" }}
              >
                Опубликовать
              </Button>
              <Button
                onClick={() =>
                  udpateCourseInfo({
                    ...course,
                    modules: [...course!.modules, ...selectModules],
                  })
                }
                sx={{ ...stylesObj.courseButton, width: "150px" }}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Snackbar
        open={publishSuccess}
        autoHideDuration={3000}
        onClose={() => setPublishSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setPublishSuccess(false)}>
          Курс опубликован!
        </Alert>
      </Snackbar>
    </>
  );
}
