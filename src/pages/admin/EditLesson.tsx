import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../shared/styles/Courses.css";

export default function EditLesson() {
  const { courseId, moduleId, lessonId } = useParams();
  return (
    <div className="coursesPage">
      <Link to={`/course/${courseId}/module/${moduleId}`}>
        {" "}
        <h2>{`< Вернуться к модулю`}</h2>
      </Link>
      <h1>Аудирование</h1>
      <Button>
        <AddIcon /> Добавить задание
      </Button>
      <h1>Чтение</h1>
      <Button>
        <AddIcon /> Добавить задание
      </Button>
      <h1>Упражнения</h1>
      <Button>
        <AddIcon /> Добавить задание
      </Button>
      <h1>Новые слова</h1>
      <Button>
        <AddIcon /> Добавить задание
      </Button>
      <h1>Грамматика</h1>
      <Button>
        <AddIcon /> Добавить задание
      </Button>
    </div>
  );
}
