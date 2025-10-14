import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {Game, MissingGame} from "../../../shared/constants/textGames.ts";

const ProfileGamesPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {Game}
      </Typography>
      <Typography variant="body1">
        {MissingGame}
      </Typography>
    </Box>
  );
};

export { ProfileGamesPage };
