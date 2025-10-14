import { Rating } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

type HealthBarProps = {
  health: number;
};

export const HealthBar = ({ health }: HealthBarProps) => {
  return (
    <Rating
      icon={<FavoriteRoundedIcon style={{ color: "crimson" }} />}
      emptyIcon={<FavoriteBorderRoundedIcon style={{ color: "crimson" }} />}
      name="user-rating"
      max={3}
      readOnly
      value={health}
      sx={{
        padding: "5px 15px",
      }}
    />
  );
};
