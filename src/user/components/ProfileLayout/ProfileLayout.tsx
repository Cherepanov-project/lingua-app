import { Outlet } from "react-router-dom";
import { ProfileSidebarLeft } from "../Profile/ProfileSidebarLeft";
import { Container } from "@mui/material";
import { Stack } from "@mui/material";

const ProfileLayout = () => {
  return (
    <>
      <Container maxWidth={"xl"} disableGutters>
        <Stack
          direction={"row"}
          useFlexGap
          sx={{ height: "100vh", backgroundColor: "white" }}
        >
          <ProfileSidebarLeft />
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export { ProfileLayout };
