import { Stack } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { ChallengeItem } from "./ChallengeItem";

const ProfileWidgetPlanToday = () => {
  return (
    <>
      <Stack sx={{ minHeight: "100px" }}>
        <Typography variant="h4">Твой план на сегодня</Typography>
        <Typography sx={{ color: "#878787", fontSize: "18px" }}>Тренируйся каждый день и забирай звезды</Typography>
      </Stack>
      <Grid container spacing={2.4}>
        <Grid size={6}>
          <ChallengeItem itemTitle="Аудирование" imageUrl="./plan-image-headphones.png" />
        </Grid>
        <Grid size={6}>
          <ChallengeItem itemTitle="Упражнение" imageUrl="./plan-image-pencil.png" />
        </Grid>
        <Grid size={6}>
          <ChallengeItem itemTitle="Чтение" imageUrl="./plan-image-notepad.png" />
        </Grid>
        <Grid size={6}>
          <ChallengeItem itemTitle="Новые слова" imageUrl="./plan-image-todo-list.png" />
        </Grid>
      </Grid>
    </>
  );
};

export { ProfileWidgetPlanToday };
