import { Box, Typography } from "@mui/material";
import Match from "../../../assets/match.svg";
import { useNavigate } from "react-router-dom";

const ProfileGamesPage = () => {
  const navigate = useNavigate();

  const handleMatchGameClick = () => {
    navigate("/games/matchgame");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Игры
      </Typography>

      <Box
        sx={{ width: 150, cursor: "pointer" }}
        onClick={handleMatchGameClick}
      >
        <img src={Match} alt="matchgame" style={{ width: "100%" }} />
        <Typography
          variant="h5"
          sx={{
            fontSize: "20px",
            fontWeight: "300",
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Соедени пары
        </Typography>
      </Box>
    </Box>
  );
};

export { ProfileGamesPage };
