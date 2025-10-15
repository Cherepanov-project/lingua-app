import { Button, Stack, Typography } from "@mui/material";
import { NextLevelTitle, RestartTitle, ShowAnswerTitle } from "../../../../shared/constants/textConsts";
import { useTruthOrLie } from "./hooks/useTruthOrLie";

export const TruthOrLieGameControls = () => {
  const { currentLevel, isLevelCompleted, nextLevel, restart, showModal } = useTruthOrLie();
  return (
    <Stack direction="row" spacing={10}>
      <Button
        disabled={!isLevelCompleted}
        onClick={showModal}
        variant="contained"
        sx={{
          width: "250px",
          height: "70px",
          borderRadius: "40px",
          background: "#F5F5F5",
        }}
      >
        <Typography variant="button" sx={{ display: "block", fontSize: "16px" }}>
          {ShowAnswerTitle}
        </Typography>
      </Button>
      <Button
        disabled={!isLevelCompleted}
        onClick={restart}
        variant="contained"
        sx={{
          width: "250px",
          height: "70px",
          borderRadius: "40px",
          background: "#ffffff",
        }}
      >
        <Typography variant="button" sx={{ display: "block", fontSize: "16px" }}>
          {RestartTitle}
        </Typography>
      </Button>
      <Button
        onClick={nextLevel}
        disabled={currentLevel === 10 || !isLevelCompleted}
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
          sx={{
            display: "block",
            fontSize: "16px",
            color: "white",
          }}
        >
          {NextLevelTitle}
        </Typography>
      </Button>
    </Stack>
  );
};
