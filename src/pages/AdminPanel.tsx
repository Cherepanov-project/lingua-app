import { Box } from "@mui/material";
import Sidebar from "./admin/adminComponents/Sidebar";
import AdminContent from "./admin/adminComponents/AdminContent";

const AdminPanel = () => {
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
      <AdminContent />
    </Box>
  );
};

export default AdminPanel;
