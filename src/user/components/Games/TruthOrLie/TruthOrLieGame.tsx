import { Box, Button, Stack, Typography } from "@mui/material";
import { useTruthOrLie } from "./hooks/useTruthOrLie";
import { LieTitle, TruthTitle } from "../../../../shared/constants/textConsts";

export const TruthOrLieGame = () => {
  const { currentStatement, isLevelCompleted, handleSelect } = useTruthOrLie();

  return (
    <>
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
          {currentStatement?.statement}
        </Typography>
      </Box>

      <Stack direction="row" spacing={8} sx={{ marginTop: "90px" }}>
        <Button
          disabled={isLevelCompleted}
          onClick={() => handleSelect("Правда")}
          variant="contained"
          sx={{
            width: "350px",
            height: "70px",
            borderRadius: "40px",
          }}
        >
          <Typography
            variant="button"
            sx={{
              display: "block",
              fontSize: "32px",
              color: "white",
            }}
          >
            {TruthTitle}
          </Typography>
        </Button>
        <Button
          disabled={isLevelCompleted}
          onClick={() => handleSelect("Ложь")}
          variant="contained"
          sx={{
            width: "350px",
            height: "70px",
            borderRadius: "40px",
            background: "#F5F5F5",
          }}
        >
          <Typography variant="button" sx={{ display: "block", fontSize: "32px" }}>
            {LieTitle}
          </Typography>
        </Button>
      </Stack>
    </>
  );
};
