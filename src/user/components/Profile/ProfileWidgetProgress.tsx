import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import type { SxProps } from "@mui/material";

interface LinearProgressWithLabelProps {
  label: string;
  value: number;
}

const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = ({ label, value }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <LinearProgress sx={linearProgress} variant="determinate" value={value} />
      <Typography sx={progressLabel}>{label}</Typography>
    </Box>
  );
};

const ProfileWidgetProgress = () => {
  return (
    <>
      <Stack sx={{ minHeight: "100px" }}>
        <Typography variant="h4">Прогресс</Typography>
        <Typography sx={{ color: "#878787", fontSize: "18px" }}>Английский язык</Typography>
      </Stack>
      <Stack spacing={"20px"}>
        <LinearProgressWithLabel label="A1 (Начальный)" value={100} />
        <LinearProgressWithLabel label="A2 (Элементарный)" value={70} />
        <LinearProgressWithLabel label="B1 (Средний)" value={0} />
        <LinearProgressWithLabel label="B2 (Выше среднего)" value={0} />
      </Stack>
    </>
  );
};

export { ProfileWidgetProgress };

///////////////////////////////////////////////////////////////////////////////

const linearProgress: SxProps = {
  height: "40px",
  borderRadius: "3rem",

  "& .MuiLinearProgress-bar": {
    borderRadius: "3rem",
  },
};

const progressLabel: SxProps = {
  color: "#ffffff",
  fontSize: "20px",
  position: "absolute",
  left: "15px",
  top: "50%",
  transform: "translateY(-50%)",
};
