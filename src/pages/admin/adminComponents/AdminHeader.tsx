import { Box, Typography, Avatar } from "@mui/material";

const AdminHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#FCFDFD",
        p: "30px 50px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "40px",
            fontWeight: 600,
            lineHeight: "70px",
            letterSpacing: "0%",
          }}
        >
          Главная
        </Typography>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "70px",
            letterSpacing: "0%",
          }}
        >
          Добро пожаловать в админ-панель!
        </Typography>
      </Box>
      <Box>
        <Avatar
          src="/mdi_account-circle-outline.png"
          sx={{
            width: 100,
            height: 100,
          }}
        />
      </Box>
    </Box>
  );
};

export default AdminHeader;
