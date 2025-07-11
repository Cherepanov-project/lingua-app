import { Box, Typography } from "@mui/material";

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "220px",
        gap: "15px",
        p: "48px 0 20px 22px",
      }}
    >
      <Box sx={{ pt: "10px" }}>
        <img src={icon} alt={label} />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography sx={{ fontSize: "32px" }}>{value}</Typography>
        <Typography sx={{ fontSize: "20px" }}>{label}</Typography>
      </Box>
    </Box>
  );
};

export default StatCard;
