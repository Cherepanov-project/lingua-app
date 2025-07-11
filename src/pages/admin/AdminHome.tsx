import { Box } from "@mui/material";
import AdminHeader from "./adminComponents/AdminHeader";
import StatCard from "./adminComponents/StatCard";
import { statsItems } from "./adminComponents/statsData";

const AdminHome = () => {
  return (
    <Box>
      <AdminHeader />

      <Box
        sx={{
          p: "0 50px",
          display: "flex",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        {statsItems.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "30px 50px",
        }}
      >
        <Box sx={{ p: "32px 21px", width: "545px" }}>
          <Box
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "30px",
            }}
          >
            Пользователи за неделю
          </Box>
          <Box>ТУТ БУДЕТ ГРАФИК</Box>
        </Box>
        <Box sx={{ p: "32px 21px", width: "400px" }}>
          <Box
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "30px",
            }}
          >
            Популярные языки
          </Box>
          <Box>ТОП ЯЗЫКОВ</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
