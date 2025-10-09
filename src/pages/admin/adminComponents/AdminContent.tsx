import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminContent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        p: "52px 45px",
        boxSizing: "border-box",
        bgcolor: "#F8F8F8",
        gap: "4px",
        alignItems: "flex-start",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: "100vh",
          borderRadius: "0 30px 30px 0",
          bgcolor: "#FCFDFD",
          boxShadow: 3,
          height: "calc(100vh - 104px)",
          flex: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminContent;
