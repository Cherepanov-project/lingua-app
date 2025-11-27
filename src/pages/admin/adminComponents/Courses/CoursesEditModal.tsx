import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useAddCourseMutation,
  useGetLanguagesQuery,
  useGetLevelsQuery,
} from "../../../../shared/api/languagesApi";
import CloseIcon from "@mui/icons-material/Close";
import type { Course } from "../../../../shared/types/course";
import { stylesObj } from "../../../../user/stylesObj";

interface ModalProps {
  open: boolean;
  item: Course;
  onClose: () => void;
  onSave: (updated: Course) => void;
}

export default function CoursesEditModal({
  open,
  item,
  onClose,
  onSave,
}: ModalProps) {
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleClose = () => onClose();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { data: levels = [] } = useGetLevelsQuery();
  const [addCourse] = useAddCourseMutation();
  const [localData, setLocalData] = useState<Course>(item);

  useEffect(() => {
    setLocalData(item);
  }, [item]);

  const handleSave = () => {
    onSave(localData);
    onClose();
  };

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
              Изменить курс
            </Typography>
            <TextField
              id="edit-course-name"
              name="edit-course-name"
              value={localData.name}
              onChange={(event) => {
                setLocalData({
                  ...localData,
                  name: event.target.value,
                });
              }}
              required
              size="small"
              label="Название курса"
              variant="outlined"
            />
            <Select
              id="edit-course-level"
              name="edit-course-level"
              required
              sx={{ ...stylesObj.registerInput, marginTop: "15px" }}
              value={localData.level}
              displayEmpty
              onChange={(e) =>
                setLocalData({ ...localData, level: e.target.value as string })
              }
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
              id="edit-course-language"
              name="edit-course-language"
              required
              sx={{ ...stylesObj.registerInput }}
              value={localData.language}
              displayEmpty
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  language: e.target.value as string,
                })
              }
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
              id="edit-course-description"
              name="edit-course-description"
              value={localData.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLocalData({
                  ...localData,
                  description: event.target.value,
                });
              }}
              required
              multiline
              label="Описание"
              variant="outlined"
            />
            <Button
              onClick={handleSave}
              sx={{ ...stylesObj.loginButton, mt: 2 }}
              variant="contained"
              color="primary"
              type="button"
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
