import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../AdminHome";
import Users from "../../admin/Users";
import Pictures from "../../admin/Pictures";

const AdminContent = () => {
  return (
    <Box
      sx={{
        width: 1070,
        height: 920,
        borderRadius: "0 30px 30px 0",
        bgcolor: "#FCFDFD",
        boxShadow: 3,
      }}
    >
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<Users />} />
        <Route path="courses" element={<div>Курсы</div>} />
        <Route path="games" element={<div>Игры</div>} />
        <Route path="reviews" element={<div>Отзывы</div>} />
        <Route path="stats" element={<div>Статистика</div>} />
        <Route path="settings" element={<div>Настройки</div>} />
        <Route path="pictures" element={<Pictures />} />
      </Routes>
    </Box>
  );
};

export default AdminContent;
