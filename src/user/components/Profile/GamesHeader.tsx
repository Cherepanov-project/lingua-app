import React from "react";
import { AppBar, Toolbar, Box, Typography, Button, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate } from "react-router-dom";

const linkHeader = {
  textTransform: "none",
  color: "#2b2b2b",
  fontSize: 24,
  padding: "6px 10px",
  marginTop: "10px",
};

const GamesHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #E6E8F0",
        minHeight: 80,
      }}
    >
      <Toolbar sx={{ minHeight: 66, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#7E94F9",
            letterSpacing: 0.2,
          }}
        >
          L
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "start",
            marginLeft: 10,
          }}
        >
          <Button sx={linkHeader} onClick={() => navigate(-1)}>
            <UndoIcon sx={{ fontSize: 20, color: "#000000", marginRight: 1 }} />
            Вернуться назад
          </Button>
        </Box>

        <Stack
          direction="row"
          spacing={7}
          alignItems="center"
          marginTop="10px"
          sx={{ color: "#000000" }}
        >
          <Typography sx={{ fontSize: 24, color: "#000000" }}>
            Уровень 3 из 10
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon sx={{ fontSize: 24, color: "#000000" }} />
            <Typography sx={{ fontSize: 20, color: "#000000" }}>
              00:30
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <StarIcon sx={{ fontSize: 40, color: "#FFC83D" }} />
            <Typography sx={{ fontSize: 20, color: "#000000" }}>70</Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default GamesHeader;
