import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { ProfileWidgetSlider } from "./ProfileWidgetSlider";
import { mockDataGamesSlider } from "./mockDataSlider";
import {CollectStars, Game} from "../../../shared/constants/textGames.ts";

const ProfileWidgetGames = () => {
  return (
    <Stack>
      <Stack className="car" sx={{ minHeight: "90px" }}>
        <Typography variant="h4">{Game}</Typography>
        <Typography sx={{ color: "#878787", fontSize: "20px" }}>
          {CollectStars}
        </Typography>
      </Stack>
      <ProfileWidgetSlider itemList={mockDataGamesSlider} />
    </Stack>
  );
};

export { ProfileWidgetGames };
