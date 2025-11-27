import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useAddCourseMutation,
  useGetLanguagesQuery,
  useGetLevelsQuery,
} from "../../../../shared/api/languagesApi";
import CloseIcon from "@mui/icons-material/Close";
import { stylesObj } from "../../../../user/stylesObj";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CoursesModal({ open, onClose }: ModalProps) {
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = () => onClose();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { data: levels = [] } = useGetLevelsQuery();
  const [addCourse] = useAddCourseMutation();

  const hanndleAddCourse = () => {
    addCourse({
      language: language,
      level: level,
      modules: [],
      published: false,
      description: description,
      name: name,
    });
    handleClose();
    setLanguage("");
    setName("");
    setDescription("");
    setLevel("");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...stylesObj.modal }}>
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              minWidth: "auto",
              padding: "4px",
              color: "#555",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
              },
            }}
          >
            <CloseIcon />
          </Button>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              hanndleAddCourse();
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
              Название курса
            </Typography>
            <TextField
              value={name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
              required
              size="small"
              id="course-name"
              name="course-name"
              label="Название курса"
              variant="outlined"
            />
            <Select
              id="course-level"
              name="course-level"
              required
              sx={{ ...stylesObj.registerInput, marginTop: "15px" }}
              value={level}
              displayEmpty
              onChange={(e) => setLevel(e.target.value as string)}
            >
              <MenuItem value="">
                <em>Уровень</em>
              </MenuItem>
              {levels.map((level) => (
                <MenuItem key={level.label} value={level.label}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>

            <Select
              id="course-language"
              name="course-language"
              required
              sx={{ ...stylesObj.registerInput }}
              value={language}
              displayEmpty
              onChange={(e) => setLanguage(e.target.value as string)}
            >
              <MenuItem value="">
                <em>Язык</em>
              </MenuItem>
              {languages.map((language) => (
                <MenuItem key={language.label} value={language.label}>
                  {language.label} {language.emoji}
                </MenuItem>
              ))}
            </Select>
            <TextField
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
              required
              multiline
              id="course-description"
              name="course-description"
              label="Описание"
              variant="outlined"
            />
            <Button
              sx={{ ...stylesObj.loginButton, mt: 2 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
