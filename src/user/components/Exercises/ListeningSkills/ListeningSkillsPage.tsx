import { ListeningCard } from "./ListeningCard.tsx";
import { Stack, Typography } from "@mui/material";
import { mockListeningExercises } from "../../Profile/mockDataSlider.ts"; // Импорт mock

export const ListeningSkillsPage = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "70px",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h4">Аудиозаписи</Typography>
      <Typography sx={{ fontSize: "24px" }}>Выберите запись для прослушивания</Typography>
      <Stack spacing={2} sx={{ width: "100%", marginTop: "20px" }}>
        {mockListeningExercises.map((exercise) => (
          <ListeningCard
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            description={exercise.description}
            level={exercise.level}
            progress={exercise.progress}
          />
        ))}
      </Stack>
    </Stack>
  );
};