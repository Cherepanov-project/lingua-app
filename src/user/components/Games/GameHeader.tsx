import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

type GameHeaderProps = {
  level: number;
};

const GameHeader = ({ level }: GameHeaderProps) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ cursor: "pointer", color: "#7E94F9" }}
            onClick={() => navigate("/")}
          >
            LinguaStep
          </Typography>

          <Box display="flex" gap={3}>
            <Button
              onClick={() => navigate("/profile/courses")}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Курсы
            </Button>

            <Button
              onClick={() => navigate("/")}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Главная
            </Button>

            <Button
              onClick={() => navigate("/profile/games")}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Игры
            </Button>
          </Box>
          <Box display="flex" gap={3}>
            <Typography color="inherit">Уровень {level} из 10</Typography>
            <Typography color="inherit">00:30</Typography>

            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <StarRateRoundedIcon style={{ color: "#f7c227" }} />
              <Typography color="inherit">42</Typography>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default GameHeader;
