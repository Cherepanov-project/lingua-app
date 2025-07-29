import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetLanguagesQuery,
  useGetLevelsQuery,
  useAddCourseMutation,
} from "../../shared/api/languagesApi";
import { useState } from "react";

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
    <Box
      sx={{
        padding: "37px 58px",
      }}
    >
      <Button component={Link} to="/courses">
        <ArrowBackIcon />
        <h2>{`Все курсы`}</h2>
      </Button>
      <h1>Новый курс</h1>
      <Box sx={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleAddCourse}>
            Далее
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
