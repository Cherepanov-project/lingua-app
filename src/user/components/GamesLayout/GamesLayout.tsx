import { Outlet } from "react-router-dom";
import GamesHeader from "../Profile/GamesHeader";
import { Container, Box } from "@mui/material";
import { GamesMain } from "../Profile/GamesMain";

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
          <GamesMain />
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};
