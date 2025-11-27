import { type SxProps } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";

interface CourseCardProps {
  language: string;
  level: string;
  description: string;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  language,
  level,
  description,
  progress,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#d2daff",
        borderRadius: "40px",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
      }}
      component={"article"}
    >
      <Stack spacing={2} useFlexGap sx={{ height: "100%" }}>
        <Typography variant="h5">{language} язык</Typography>
        <Typography variant="h5">- Уровень {level}</Typography>
        <Typography variant="h6" color="#878787">
          {description}
        </Typography>

        <Stack
          spacing={3}
          sx={{
            marginTop: "auto",
          }}
        >
          <>
            <LinearProgress
              sx={linearProgress}
              variant="determinate"
              value={progress}
            />
            <Typography variant="h6" color="#878787">
              Пройдено {progress} %
            </Typography>
          </>
          {progress > 0 ? (
            <Button sx={activationButton} variant="contained">
              Продолжить
            </Button>
          ) : (
            <Button sx={activationButton} variant="contained">
              Начать
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export { CourseCard };

///////////////////////////////////////////////////////////////////////////////

const linearProgress: SxProps = {
  height: "10px",
  borderRadius: "3rem",
  backgroundColor: "white",

  "& .MuiLinearProgress-bar": {
    borderRadius: "3rem",
  },
};

const activationButton: SxProps = {
  borderRadius: "3rem",
  color: "white",
  width: "100%",
};
