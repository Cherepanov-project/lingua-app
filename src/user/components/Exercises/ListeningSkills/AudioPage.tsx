import {Box, Stack, Button, Typography} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import {mockListeningExercises} from "../../Profile/mockDataSlider.ts";
import {audioStack, nextStep} from "./listeningConst.ts";

export const AudioPage = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exercise = mockListeningExercises.find((ex) => ex.id === id);

  if (!exercise) {
    return <Typography>Запись не найдена</Typography>;
  }

  const handleContinue = () => {
    navigate(`/profile/exercises/listening/${id}/quiz`);
  };

  return (
    <Stack
      sx={audioStack}
    >
      <Typography variant="h4">{exercise.name}</Typography>
      <Box sx={{margin: "20px 0"}}>
        <img
          style={{width: "300px"}}
          src={exercise.imageUrl}
          alt="Изображение"
        />
      </Box>
      <audio
        controls
        src={exercise.audioUrl}
      />
      <Button
        sx={{marginTop: "20px", borderRadius: "3rem"}}
        variant="contained"
        onClick={handleContinue}
      >
        {nextStep}
      </Button>
    </Stack>
  );
};