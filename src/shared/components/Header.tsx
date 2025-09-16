import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ cursor: "pointer", color: "#7E94F9" }}
            onClick={() => navigate("/")}>
            LinguaStep
          </Typography>

          <Box display="flex" gap={3}>
            <Button
              onClick={() => navigate("/")}
              color="inherit"
              sx={{ textTransform: "none" }}>
              Главное
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              color="inherit"
              sx={{ textTransform: "none" }}>
              О нас
            </Button>
            <Button
              onClick={() => navigate("/contacts")}
              color="inherit"
              sx={{ textTransform: "none" }}>
              Контакты
            </Button>
          </Box>

          {!isAuthenticated ? (
            <Box display="flex" gap={2}>
              <Button
                onClick={() => navigate("/register")}
                color="inherit"
                sx={{ textTransform: "none" }}>
                Зарегистрироваться
              </Button>
              <NavigationButton to="/login" variant="contained" color="primary">
                Войти
              </NavigationButton>
            </Box>
          ) : (
            <Button
              onClick={() => navigate("/profile")}
              color="inherit"
              sx={{
                textTransform: "none",
                fontSize: "16px",
              }}
              startIcon={
                <Avatar
                  alt={user?.name}
                  src={user?.picture}
                  sx={{ width: 32, height: 32 }} />
              }>
              Профиль
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;