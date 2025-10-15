import { Button, Container, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Link } from "react-router-dom";

const GameOver = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        borderRadius: "30px",
        backgroundColor: "#D9E0FF",
        padding: "50px",
      }}
    >
      <Stack alignItems="center">
        <FavoriteBorderRoundedIcon
          style={{ color: "crimson", fontSize: "62px" }}
        />

        <Typography variant="h3" fontWeight={600} sx={{ marginTop: "80px" }}>
          У вас закончились жизни
        </Typography>

        <Button
          component={Link}
          to="/profile"
          variant="contained"
          sx={{
            width: "250px",
            height: "70px",
            borderRadius: "40px",
            background: "#F5F5F5",
            marginTop: "130px",
          }}
        >
          <Typography
            variant="button"
            sx={{ display: "block", fontSize: "16px" }}
          >
            Вернуться в профиль
          </Typography>
        </Button>
      </Stack>
    </Container>
  );
};

export default GameOver;
