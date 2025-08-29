import { Box } from '@mui/material'
import { Container } from '@mui/material'
import { Grid } from '@mui/material'
import { Stack } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import { useGetUserProfileQuery } from '../../features/auth/authApi'
import { getCookie } from '../../utils/cookies'
import { ProfileWidgetPlanToday } from './ProfileWidgetPlanToday'
import { ProfileWidgetProgress } from './ProfileWidgetProgress'
import { ProfileHeader } from './ProfileHeader'
import { ProfileWidgetGames } from './ProfileWidgetGames'
import { ProfileWidgetGrammar } from './ProfileWidgetGrammar'
import { ProfileSidebarLeft } from './ProfileSidebarLeft'

interface JwtPayload {
  sub: string // userId в JWT
}

const Profile: React.FC = () => {
  const token = getCookie('auth_token')

  let userId: string | undefined
  let decodedToken: JwtPayload | undefined
  if (token) {
    try {
      decodedToken = jwtDecode<JwtPayload>(token)
      userId = decodedToken.sub
    } catch (e) {
      console.error('Ошибка декодирования токена:', e)
    }
  }

  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetUserProfileQuery(userId as string, { skip: !token || !userId })

  if (!token) {
    return <Navigate to="/login" />
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size="100px" />
      </Box>
    )
  }

  if (error || !userProfile) {
    return <div>Ошибка загрузки профиля</div>
  }

  return (
    <Container maxWidth={'xl'} disableGutters>
      <Stack direction={'row'} useFlexGap sx={{ height: '100vh', backgroundColor: 'white' }}>
        <ProfileSidebarLeft />
        <Stack
          component={'main'}
          sx={{
            flexGrow: '1',
            padding: '0 80px',
            paddingBottom: '50px',
            overflowY: 'scroll',
            scrollbarColor: '#d9e0ff transparent',
          }}
        >
          <ProfileHeader userProfile={userProfile} />
          <Grid component={'section'} rowSpacing={5} columnSpacing={10} container>
            <Grid size={7}>
              <ProfileWidgetPlanToday />
            </Grid>
            <Grid size={5}>
              <ProfileWidgetProgress />
            </Grid>
            <Grid size={7}>
              <ProfileWidgetGrammar />
            </Grid>
            <Grid size={5}>
              <ProfileWidgetGames />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Profile
