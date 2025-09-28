import { Box, Typography } from "@mui/material";
import heartIcon from "../../../assets/Heart.svg";

const heartStyle = {
  width: "40px",
  height: "40px",
};

export const GamesMain = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, mb: 2, color: "error.main" }}>
          <Box component="img" src={heartIcon} sx={heartStyle} />
          <Box component="img" src={heartIcon} sx={heartStyle} />
          <Box component="img" src={heartIcon} sx={heartStyle} />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: "36px",
            fontWeight: "500",
            color: "text.primary",
          }}
        >
          Соедени пары
        </Typography>
      </Box>
    </>
  );
};
