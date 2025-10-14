import { Box, Typography } from "@mui/material";
import { levelCompletedTitle } from "../../../shared/constants/textConsts";

export const LevelCompleted = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "550px",
          height: "280px",
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
            lineHeight: "1.5",
            textAlign: "center",
          }}
        >
          {levelCompletedTitle}
        </Typography>
      </Box>
    </>
  );
};

export default LevelCompleted;
