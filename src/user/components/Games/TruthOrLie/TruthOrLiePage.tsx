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
import { mockDataTruthOrLie } from "./mockDataTruthOrLie";
import { useState } from "react";
import TruthOrLieModal from "./TruthOrLieModal";

export const TruthOrLiePage = () => {
  const [questions] = useState(mockDataTruthOrLie);
  const [lvl, setLvl] = useState(1);
  const [open, setOpen] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(questions[1][0]);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const nextQuestion = (variant: string) => {
    setUserAnswer((prev) => [...prev, variant]);

    if (count < 9) {
      setCount((prev) => prev + 1);
      setCurrentQuestion(questions[lvl][count + 1]);
    } else {
      setDisabled(true);
    }
  };

  const nextLevel = () => {
    if (lvl < 10) {
      const newLvl = lvl + 1;
      setLvl(newLvl);
      setCurrentQuestion(questions[newLvl][0]);
      setCount(0);
      setUserAnswer([]);
      setDisabled(false);
    }
  };

  const restart = () => {
    setLvl(1);
    setCurrentQuestion(questions[1][0]);
    setCount(0);
    setUserAnswer([]);
    setDisabled(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: "white", height: "100vh" }}
    >
      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "white", height: "100vh" }}
      >
        <GameHeader level={lvl} />
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
              defaultValue={3}
              readOnly
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
                height: "120px",
                backgroundColor: "white",
                borderRadius: "15px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "110px",
                padding: "20px",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "40px",
                  lineHeight: "1",
                  textAlign: "center",
                }}
              >
                {disabled
                  ? "Перейдите на следующий уровень"
                  : currentQuestion.text}
              </Typography>
            </Box>
            <Stack direction="row" spacing={8} sx={{ marginTop: "90px" }}>
              <Button
                disabled={disabled}
                onClick={() => nextQuestion("Правда")}
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
                disabled={disabled}
                onClick={() => nextQuestion("Ложь")}
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
                  disabled={!disabled}
                  onClick={handleOpen}
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
                  onClick={restart}
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
                  onClick={nextLevel}
                  disabled={lvl === 10}
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
                <b>{currentQuestion.number}/10</b> пройдено
              </Typography>
            </Stack>
          </Stack>
        </Container>
        <TruthOrLieModal
          open={open}
          handleClose={handleClose}
          lvl={lvl}
          userAnswer={userAnswer}
          questions={questions}
        />
      </Container>
    </Container>
  );
};
