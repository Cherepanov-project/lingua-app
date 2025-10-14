import type { UserProfile } from "../../../types/user";
import { Avatar } from "@mui/material";
import { Rating } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

const ProfileHeader: React.FC<UserProfile> = ({ userProfile }) => {
  return (
    <Stack
      spacing={6}
      useFlexGap
      direction={"row"}
      component={"section"}
      sx={{
        padding: "20px 0 0 0",
        minHeight: "240px",
        alignItems: "center",
      }}
    >
      <Avatar
        src={userProfile?.picture}
        alt={userProfile?.name}
        sx={{ width: "110px", height: "110px" }}
      />
      <Typography sx={{ flexGrow: "1" }} variant="h3">
        Привет {userProfile?.name}!
      </Typography>
      <Stack direction={"row"} spacing={"20px"} sx={{ alignSelf: "start" }}>
        <Rating
          icon={<FavoriteRoundedIcon style={{ color: "crimson" }} />}
          emptyIcon={<FavoriteBorderRoundedIcon style={{ color: "crimson" }} />}
          name="user-rating"
          defaultValue={3}
          size="large"
          sx={{
            padding: "5px 15px",
            borderRadius: "3rem",
            backgroundColor: "#d2daff",
          }}
        />
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <StarRateRoundedIcon style={{ color: "#f7c227" }} />
          <Typography color="lightgray">42</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { ProfileHeader };
