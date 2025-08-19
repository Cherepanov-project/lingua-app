import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { ProfileNavigationList } from './ProfileNavigationList'

// ProfileSidebarLeft

const ProfileSidebarLeft = () => {
  return (
    <Stack
      component={'aside'}
      sx={{
        width: '35%',
        padding: '33px 0',
        borderTopRightRadius: '40px',
        borderBottomRightRadius: '40px',
        backgroundColor: '#d9e0ff',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          margin: '0 auto',
          marginBottom: '20px',
          flexBasis: '200px',
          fontWeight: '700',
          color: '#7E94F9',
        }}
      >
        LinguaStep
      </Typography>

      <ProfileNavigationList />
    </Stack>
  )
}

export { ProfileSidebarLeft }
