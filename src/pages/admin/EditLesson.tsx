import { Link, useParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../../shared/styles/Courses.css";

export default function EditLesson() {
  const { courseId, moduleId } = useParams();
  return (
    <Box className="coursesPage">
      <Button component={Link} to={`/course/${courseId}/module/${moduleId}`}>
        {" "}
        <ArrowBackIcon />
        <h2>{`Вернуться к модулю`}</h2>
      </Button>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <h1>Аудирование</h1>
        <Button>
          <AddIcon /> Добавить задание
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <h1>Чтение</h1>
        <Button>
          <AddIcon /> Добавить задание
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <h1>Упражнения</h1>
        <Button>
          <AddIcon /> Добавить задание
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <h1>Новые слова</h1>
        <Button>
          <AddIcon /> Добавить задание
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <h1>Грамматика</h1>
        <Button>
          <AddIcon /> Добавить задание
        </Button>
      </Box>
    </Box>
  );
}
