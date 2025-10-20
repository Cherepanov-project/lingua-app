import { type SxProps } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import {useNavigate} from "react-router-dom";

interface ExercisesCardProps {
  id?: string;
  type?: string;
  name: string;
  text: string;
  imageUrl: string;
  questions?: [];
  progress: number;
  nav?: string;
}

const ExercisesCard: React.FC<ExercisesCardProps> = ({ name, text, progress, imageUrl, nav }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (nav) {
      navigate(nav);
    }
  }

  return (
    <Stack
      sx={{
        padding: "25px 55px",
        borderRadius: "40px",
        backgroundColor: "#d2daff",
        flexShrink: 1,
        minHeight: "200px",
        height: "30%",
        maxHeight: "270px",
      }}
    >
      <Stack direction={"row"} sx={{ width: "100%", height: "100%" }}>
        <Stack sx={{ width: "100%" }} direction={"row"} spacing={5} useFlexGap>
          <Box sx={{ width: "15vh", maxWidth: "146px", minWidth: "150px" }}>
            <img style={{ width: "100%" }} src={imageUrl} />
          </Box>
          <Stack sx={{ width: "65%", height: "100%" }} justifyContent={"space-around"} spacing={2}>
            <Box>
              <Typography variant="h4">{name}</Typography>
              <Typography gutterBottom color="#878787">
                {text}
              </Typography>
            </Box>
            <LinearProgress sx={linearProgress} variant="determinate" value={progress} />
            <Button sx={button} variant="contained" onClick={handleButtonClick}>
              {progress === 100 ? "Продолжить" : "Начать"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { ExercisesCard };

///////////////////////////////////////////////////////////////////////////////

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
