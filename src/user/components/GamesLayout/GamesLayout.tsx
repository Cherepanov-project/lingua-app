import { Outlet } from "react-router-dom";
import GamesHeader from "../Profile/GamesHeader";
import { Container, Box, Typography } from "@mui/material";
import heartIcon from "../../../assets/Heart.svg";
import MenuIcon from "@mui/icons-material/Menu";

export const GamesLayout = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <GamesHeader />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            backgroundColor: "background.default",
            borderRadius: "20px",
            marginTop: "-10px",
            paddingTop: "40px",
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 5,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <MenuIcon sx={{ position: "absolute", left: 15, top: 15 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: 2, color: "error.main" }}>
              <Box
                component="img"
                src={heartIcon}
                sx={{ width: "40px", height: "40px" }}
              />
              <Box
                component="img"
                src={heartIcon}
                sx={{ width: "40px", height: "40px" }}
              />
              <Box
                component="img"
                src={heartIcon}
                sx={{ width: "40px", height: "40px" }}
              />
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
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};
