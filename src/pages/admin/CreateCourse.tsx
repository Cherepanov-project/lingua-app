import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetLanguagesQuery,
  useGetLevelsQuery,
  useAddCourseMutation,
} from "../../shared/api/languagesApi";
import { useState } from "react";
import "../../shared/styles/Courses.css";

export default function CreateCourse() {
  const { data: languages = [], isLoading: isLanguagesLoading } =
    useGetLanguagesQuery();
  const { data: levels = [], isLoading: isLevelsLoading } = useGetLevelsQuery();

  const [addCourse] = useAddCourseMutation();
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const navigate = useNavigate();

  const handleAddCourse = async () => {
    if (selectedLang !== "" && selectedLevel !== "") {
      const result = await addCourse({
        language: selectedLang,
        level: selectedLevel,
        modules: [],
        published: false,
      }).unwrap();
      navigate(`/course/${result.id}`);
    }
  };

  return (
    <div className="coursesPage">
      <Link to="/courses">
        <h2>{`< Все курсы`}</h2>
      </Link>
      <h1>Новый курс</h1>
      <div className="courseSelect">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Выбрать язык</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Выбрать язык"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            required
          >
            {isLanguagesLoading ? (
              <MenuItem disabled>Загрузка...</MenuItem>
            ) : (
              languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.label}>
                  {lang.label} {lang.emoji}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Выбрать уровень</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Выбрать уровень"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {isLevelsLoading ? (
              <MenuItem disabled>Загрузка...</MenuItem>
            ) : (
              levels.map((lvl) => (
                <MenuItem key={lvl.id} value={lvl.label}>
                  {lvl.label}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <Button onClick={() => handleAddCourse()}>Далее</Button>{" "}
      </div>
    </div>
  );
}
