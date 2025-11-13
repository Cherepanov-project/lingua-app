import {Box, Stack, Button, Typography} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import {audioStack, nextStep, cardStack} from "./listeningConst.ts";
import {useGetListeningExerciseQuery} from "../../../../shared/api/listeningApi.ts";

export const AudioPage = () => {
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {data: exercise, isLoading, error} = useGetListeningExerciseQuery(id!);

  if (isLoading) return <Typography>Загрузка...</Typography>

  if (error || !exercise) return <Typography>Запись не найдена</Typography>;

  const handleContinue = () => {
    navigate(`/profile/exercises/listening/${id}/quiz`);
  };

  return (
    <Stack sx={audioStack}>
      <Stack
        sx={{
          ...cardStack,
          width: "100%",
          maxWidth: "1200px",
          alignItems: "center",
          maxHeight: "80vh",
          padding: "20px 40px",
        }}
      >
        <Typography variant="h4">{exercise.name}</Typography>
        <Box
          sx={{
            margin: "15px 0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "10%",
              maxWidth: "10%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "contain",
            }}
            src={exercise.imageUrl}
            alt="Изображение"
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <audio
            controls
            src={exercise.audioUrl}
            style={{
              width: "100%",
            }}
          />
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ marginTop: "15px", borderRadius: "3rem" }}
            variant="contained"
            onClick={handleContinue}
          >
            {nextStep}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};