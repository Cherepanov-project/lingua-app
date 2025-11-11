import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useGetLanguagesQuery,
  useGetLevelsQuery,
} from "../../../shared/api/languagesApi";
import { useUserMeta } from "../../features/hooks/useUserMeta";
import { useUpdateUserMetaMutation } from "../../../shared/api/usersApi";
import { stylesObj } from "../../stylesObj";

export const AddMetaToAccountModal = () => {
  const [level, setLevel] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const { data: languages = [] } = useGetLanguagesQuery();
  const { data: levels = [] } = useGetLevelsQuery();
  const { meta, isFetching, isLoading, userId } = useUserMeta();
  const [updateUserMeta] = useUpdateUserMetaMutation();
  if (isFetching || isLoading) return null;

  if (!meta || Object.keys(meta).length === 0) {
    const hanndleUpdate = async () => {
      if (level && language) {
        try {
          await updateUserMeta({ userId, level, language }).unwrap();
          handleClose();
          console.log("metadata обновлены");
        } catch (error) {
          console.error("Ошибка при обновлении meta:", error);
        }
      }
    };
    return (
      <>
        <Modal
          open={open}
          onClose={(_, reason) => {
            if (reason === "backdropClick" || reason === "escapeKeyDown")
              return;
            handleClose();
          }}
          disableEscapeKeyDown
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...stylesObj.modal }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                hanndleUpdate();
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
                Укажите язык и свой уровень
              </Typography>

              <Select
                required
                sx={{ ...stylesObj.registerInput }}
                value={level}
                displayEmpty
                onChange={(e) => setLevel(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>Выбери свой уровень</em>
                </MenuItem>
                {levels.map((level) => (
                  <MenuItem key={level.label} value={level.label}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>

              <Select
                required
                sx={{ ...stylesObj.registerInput }}
                value={language}
                displayEmpty
                onChange={(e) => setLanguage(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>Выбери язык</em>
                </MenuItem>
                {languages.map((language) => (
                  <MenuItem key={language.label} value={language.label}>
                    {language.label} {language.emoji}
                  </MenuItem>
                ))}
              </Select>

              <Button
                sx={{ ...stylesObj.loginButton, mt: 2 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Отправить
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
};
