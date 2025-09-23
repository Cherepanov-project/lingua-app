import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import GameHeader from "./GameHeader";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const TruthOrLie = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: "white", height: "100vh" }}
    >
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "white", height: "100vh" }}
      >
        <GameHeader />
        <Container
          maxWidth="lg"
          sx={{
            borderRadius: "30px",
            backgroundColor: "#D9E0FF",
            padding: "50px",
          }}
        >
          <Stack alignItems="center">
            <Rating
              icon={<FavoriteRoundedIcon style={{ color: "crimson" }} />}
              emptyIcon={
                <FavoriteBorderRoundedIcon style={{ color: "crimson" }} />
              }
              name="user-rating"
              max={3}
              defaultValue={2}
              size="large"
              sx={{
                padding: "5px 15px",
              }}
            />
            <Typography
              variant="h3"
              fontWeight={600}
              sx={{ marginTop: "40px" }}
            >
              Правда или ложь?
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "550px",
                minHeight: "120px",
                backgroundColor: "white",
                borderRadius: "15px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "110px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "48px",
                  lineHeight: "1.2",
                }}
              >
                Cat are black
              </Typography>
            </Box>
            <Stack direction="row" spacing={8} sx={{ marginTop: "90px" }}>
              <Button
                variant="contained"
                sx={{ width: "350px", height: "70px", borderRadius: "40px" }}
              >
                <Typography
                  variant="button"
                  sx={{ display: "block", fontSize: "32px", color: "white" }}
                >
                  Правда
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "350px",
                  height: "70px",
                  borderRadius: "40px",
                  background: "#F5F5F5",
                }}
              >
                <Typography
                  variant="button"
                  sx={{ display: "block", fontSize: "32px" }}
                >
                  Ложь
                </Typography>
              </Button>
            </Stack>
            <Stack spacing={4} alignItems="center" sx={{ marginTop: "130px" }}>
              <Stack direction="row" spacing={10}>
                <Button
                  variant="contained"
                  sx={{
                    width: "250px",
                    height: "70px",
                    borderRadius: "40px",
                    background: "#F5F5F5",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{ display: "block", fontSize: "16px" }}
                  >
                    Показать ответы
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "250px",

                    height: "70px",
                    borderRadius: "40px",
                    background: "#ffffff",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{ display: "block", fontSize: "16px" }}
                  >
                    Перезапустить
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "250px",

                    height: "70px",
                    borderRadius: "40px",
                    background: "#7E94F9",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{ display: "block", fontSize: "16px", color: "white" }}
                  >
                    Следующий уровень
                  </Typography>
                </Button>
              </Stack>
              <Typography
                sx={{ display: "block", fontSize: "18px", color: "#0000007d" }}
              >
                <b>3/10</b> пройдено
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
};

export default TruthOrLie;
