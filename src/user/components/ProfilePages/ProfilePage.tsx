import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useGetUserProfileQuery } from "../../features/auth/authApi";
import { getCookie } from "../../utils/cookies";
import { ProfileHeader } from "../Profile/ProfileHeader";
import { ProfileWidgetPlanToday } from "../Profile/ProfileWidgetPlanToday";
import { ProfileWidgetProgress } from "../Profile/ProfileWidgetProgress";
import { ProfileWidgetGrammar } from "../Profile/ProfileWidgetGrammar";
import { ProfileWidgetGames } from "../Profile/ProfileWidgetGames";

interface JwtPayload {
  sub: string; // userId в JWT
}

const ProfilePage = () => {
  const token = getCookie("auth_token");

  let userId: string | undefined;
  let decodedToken: JwtPayload | undefined;
  if (token) {
    try {
      decodedToken = jwtDecode<JwtPayload>(token);
      userId = decodedToken.sub;
    } catch (e) {
      console.error("Ошибка декодирования токена:", e);
    }
  }

  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetUserProfileQuery(userId as string, { skip: !token || !userId });

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          flexGrow: "1",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="100px" />
      </Box>
    );
  }

  if (error || !userProfile) {
    return <div>Ошибка загрузки профиля</div>;
  }

  return (
    <Stack
      component={"main"}
      sx={{
        flexGrow: "1",
        padding: "0 80px",
        paddingBottom: "80px",
      }}
    >
      <ProfileHeader userProfile={userProfile} />
      <Grid component={"section"} rowSpacing={4} columnSpacing={10} container>
        <Grid size={6}>
          <ProfileWidgetPlanToday />
        </Grid>
        <Grid size={5}>
          <ProfileWidgetProgress />
        </Grid>
        <Grid size={6}>
          <ProfileWidgetGrammar />
        </Grid>
        <Grid size={5}>
          <ProfileWidgetGames />
        </Grid>
      </Grid>
    </Stack>
  );
};

export { ProfilePage };
