import { Box, Typography, List, ListItemButton, ListItemText, styled } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../adminComponents/menuItems";

const StyledListItemButton = styled(ListItemButton)(() => ({
  "&.Mui-selected": {
    backgroundColor: "#D2DAFF",
    "&:hover": {
      backgroundColor: "#D2DAFF",
    },
  },
  "&:hover": {
    backgroundColor: "rgba(91, 97, 250, 0.08)",
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 275,
        height: 920,
        borderRadius: "30px 0 0 30px",
        bgcolor: "#FDFDFD",
        boxShadow: 3,
      }}
    >
      <Typography
        fontSize={"40px"}
        fontWeight={700}
        padding={"15px 0 15px 34px"}
        sx={{
          cursor: "pointer",
          color: "#5b61fa",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={() => navigate("/admin")}
      >
        LinguaStep
      </Typography>

      <List component="nav">
        {menuItems.map((item) => (
          <StyledListItemButton
            key={item.path}
            selected={
              location.pathname === item.path ||
              (location.pathname === "/admin" && item.path === "/admin")
            }
            onClick={() => navigate(item.path)}
            sx={{
              pl: "89px",
            }}
          >
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontSize: "24px",
              }}
            />
          </StyledListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
