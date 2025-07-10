import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationButton from "./NavigationButton";

const Header = () => {
  const navigate = useNavigate();

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

          <Box display="flex" gap={2}>
            <Button
              onClick={() => navigate("/signup")}
              color="inherit"
              sx={{ textTransform: "none" }}>
              Зарегистрироваться
            </Button>
            <NavigationButton to="/auth">Войти</NavigationButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
