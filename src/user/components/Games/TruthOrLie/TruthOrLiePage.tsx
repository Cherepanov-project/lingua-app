import { Container, Stack, Typography } from "@mui/material";
import GameHeader from "../GameHeader";
import GameOver from "../GameOver";

import TruthOrLieModal from "./TruthOrLieModal";
import { useTruthOrLie } from "./hooks/useTruthOrLie";
import { useAppSelector } from "../../../../shared/hooks/redux";
import { HealthBar } from "../HealthBar";
import { TruthOrLieGameTitle, LoadingTitle } from "../../../../shared/constants/textConsts";
import { TruthOrLieGameControls } from "./TruthOrLieGameControls";
import LevelCompleted from "../LevelCompleted";
import { TruthOrLieGame } from "./TruthOrLieGame";

export const TruthOrLiePage = () => {
  const { currentStatement, currentLevel, userSelection, isLevelCompleted, isLoading, closeModal } = useTruthOrLie();

  const health = useAppSelector((state) => state.truthOrLie.health);

  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white", height: "100vh" }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "white", height: "100vh" }}>
        <GameHeader level={currentLevel} />
        <Container
          maxWidth="lg"
          sx={{
            borderRadius: "30px",
            backgroundColor: "#D9E0FF",
            padding: "50px",
            height: "900px",
          }}
        >
          {!health ? (
            <GameOver />
          ) : (
            <Stack alignItems="center">
              <HealthBar health={health} />
              <Typography variant="h3" fontWeight={600} sx={{ marginTop: "40px" }}>
                {TruthOrLieGameTitle}
              </Typography>
              {isLoading || !currentStatement ? (
                <Typography variant="h3" fontWeight={600} sx={{ marginTop: "250px" }}>
                  {LoadingTitle}
                </Typography>
              ) : (
                <>
                  {isLevelCompleted ? <LevelCompleted /> : <TruthOrLieGame />}
                  <Stack spacing={4} alignItems="center" sx={{ marginTop: "130px" }}>
                    <TruthOrLieGameControls />
                    <Typography
                      sx={{
                        display: "block",
                        fontSize: "18px",
                        color: "#0000007d",
                      }}
                    >
                      <b>{currentStatement.id}/10</b> пройдено
                    </Typography>
                  </Stack>
                </>
              )}
            </Stack>
          )}
        </Container>
        <TruthOrLieModal closeModal={closeModal} userSelection={userSelection} />
      </Container>
    </Container>
  );
};
