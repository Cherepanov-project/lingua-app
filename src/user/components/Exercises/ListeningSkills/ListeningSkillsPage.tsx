import { ListeningCard } from "./ListeningCard.tsx";
import { Stack, Typography } from "@mui/material";
import { mockListeningExercises } from "../../Profile/mockDataSlider.ts";
import {
  audio,
  listeningSkillsPageStack,
  selectAudio
} from "./listeningConst.ts";

export const ListeningSkillsPage = () => {
  return (
    <Stack
      sx={listeningSkillsPageStack}
    >
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        {audio}
      </Typography>
      <Typography sx={{ fontSize: "24px", marginBottom: "20px" }}>
        {selectAudio}
      </Typography>
      <Stack spacing={2} sx={{ width: "100%", maxWidth: "1200px" }}>
        {mockListeningExercises.map((exercise) => (
          <ListeningCard
            key={exercise.id}
            id={exercise.id}
            name={exercise.name}
            description={exercise.description}
            level={exercise.level}
          />
        ))}
      </Stack>
    </Stack>
  );
};