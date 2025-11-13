import { Outlet } from "react-router-dom";
import { ProfileSidebarLeft } from "../Profile/ProfileSidebarLeft";
import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: LayoutProps) => {
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
      {children}
    </>
  );
};

export { ProfileLayout };
