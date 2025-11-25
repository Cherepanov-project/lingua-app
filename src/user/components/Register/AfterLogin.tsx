import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import {
  useGetLanguagesQuery,
  useGetLevelsQuery,
} from "../../../shared/api/languagesApi";
import { useUserMeta } from "../../features/hooks/useUserMeta";
import { useUpdateUserMetaMutation } from "../../../shared/api/usersApi";
import { stylesObj } from "../../stylesObj";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../shared/components/Notification";
export const AfterLogin = () => {
  const [level, setLevel] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const { data: languages = [] } = useGetLanguagesQuery();
  const { data: levels = [] } = useGetLevelsQuery();
  const { userId } = useUserMeta();
  const [updateUserMeta] = useUpdateUserMetaMutation();
  const navigate = useNavigate();
  const [metaError, setMetaError] = useState("");
  const hanndleUpdate = async () => {
    if (level && language) {
      try {
        await updateUserMeta({ userId, level, language }).unwrap();
        navigate("/profile");
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        setMetaError(`Ошибка метаданных: ${message}`);
      }
    }
  };

  return (
    <>
      {metaError && (
        <Notification
          message={metaError}
          open={!!metaError}
          onClose={() => setMetaError("")}
        ></Notification>
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h4" sx={stylesObj.afterLoginText}>
            Спасибо за регистрацию!
          </Typography>

          <Typography
            variant="h6"
            sx={{ ...stylesObj.afterLoginText, maxWidth: 600 }}
          >
            Чтобы начать обучение, выберите язык и уровень знаний:
          </Typography>

          <Box sx={stylesObj.afterLoginForm}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                hanndleUpdate();
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Select
                required
                sx={stylesObj.registerInput}
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

              <Select
                required
                sx={stylesObj.registerInput}
                value={level}
                displayEmpty
                onChange={(e) => setLevel(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>Выбери уровень</em>
                </MenuItem>
                {levels.map((level) => (
                  <MenuItem key={level.label} value={level.label}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>

              <Button
                sx={{ ...stylesObj.loginButton, mt: 3 }}
                variant="contained"
                type="submit"
              >
                Отправить
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
