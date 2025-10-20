import {Box, Stack, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {type SxProps} from "@mui/material";
import {cardStack, done, start} from "./listeningConst.ts";


interface ListeningCardProps {
  id: string;
  name: string;
  description: string;
  level: string;
  progress: boolean;
}

const button: SxProps = {
  padding: "0 20px",
  paddingInline: "40px",
  borderRadius: "3rem",
  color: "white",
  alignSelf: "flex-end",
  fontSize: "20px",
  textTransform: "capitalize",

};

export const ListeningCard = ({
                                id,
                                name,
                                description,
                                level,
                                progress
                              }: ListeningCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/exercises/listening/${id}`);
  };

  return (
    <Stack
      sx={cardStack}
    >
      <Stack
        direction={"row"}
        sx={{width: "100%"}}
      >
        <Stack
          sx={{width: "100%"}}
          direction={"row"}
          spacing={5}
          useFlexGap
        >
          <Stack
            sx={{width: "100%"}}
            justifyContent={"space-around"}
            spacing={2}
          >
            <Box>
              <Typography variant="h4">{name}</Typography>
              <Typography
                gutterBottom
                color="#878787"
              >
                {description} (Уровень: {level})
              </Typography>
            </Box>
            <Button
              sx={{
                ...button,
                backgroundColor: progress ? "#4caf50" : undefined,
              }}
              variant="contained"
              onClick={handleClick}
            >
              {progress ? done : start}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

