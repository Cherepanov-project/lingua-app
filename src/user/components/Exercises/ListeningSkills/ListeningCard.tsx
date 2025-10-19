import { Box, Stack, Button, Typography, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { type SxProps } from "@mui/material";


interface ListeningCardProps {
  id: string;
  name: string;
  description: string;
  level: string;
  progress: number;
}

const linearProgress: SxProps = {
  height: "10px",
  borderRadius: "3rem",
  backgroundColor: "white",
  "& .MuiLinearProgress-bar": {
    borderRadius: "3rem",
  },
};

const button: SxProps = {
  padding: "0 20px",
  paddingInline: "40px",
  borderRadius: "3rem",
  color: "white",
  alignSelf: "flex-end",
  fontSize: "20px",
  textTransform: "capitalize",
};

export const ListeningCard = ({ id, name, description, level, progress }: ListeningCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listening-exercises/${id}`);
  };

  return (
    <Stack
      sx={{
        padding: "25px 55px",
        borderRadius: "40px",
        backgroundColor: "#d2daff",
        flexShrink: 1,
        minHeight: "200px",
        height: "auto",
        maxHeight: "270px",
      }}
    >
      <Stack direction={"row"} sx={{ width: "100%", height: "100%" }}>
        <Stack sx={{ width: "100%" }} direction={"row"} spacing={5} useFlexGap>
          <Stack sx={{ width: "65%", height: "100%" }} justifyContent={"space-around"} spacing={2}>
            <Box>
              <Typography variant="h4">{name}</Typography>
              <Typography gutterBottom color="#878787">
                {description} (Уровень: {level})
              </Typography>
            </Box>
            <LinearProgress sx={linearProgress} variant="determinate" value={progress} />
            <Button sx={button} variant="contained" onClick={handleClick}>
              {progress > 0 ? "Продолжить" : "Начать"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

