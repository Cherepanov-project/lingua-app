import { ListeningCard } from "./ListeningCard.tsx";
import { Stack, Typography } from "@mui/material";
import {
  audio,
  listeningSkillsPageStack,
  selectAudio
} from "./listeningConst.ts";
import {
  useGetListeningExercisesQuery
} from "../../../../shared/api/listeningApi.ts";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

export const ListeningSkillsPage = () => {
  const {data: exercises, isLoading, error} = useGetListeningExercisesQuery();

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (error) {
    const errorMessage =
      "status" in error
        ? `Ошибка ${error.status}: ${(error as FetchBaseQueryError).data || "Неизвестная ошибка"}`
        : error.message || "Не удалось загрузить упражнения";
    return <Typography>{errorMessage}</Typography>;
  }

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
        {exercises?.map((exercise) => (
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