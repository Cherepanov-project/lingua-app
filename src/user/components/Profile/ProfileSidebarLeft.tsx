import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { ProfileNavigationList } from './ProfileNavigationList'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { removeCookie } from '../../utils/cookies'

const ProfileSidebarLeft = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    removeCookie('auth_token');
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Stack
      component={'aside'}
      sx={{
        minWidth: '377px',
        padding: '33px 0',
        borderTopRightRadius: '40px',
        borderBottomRightRadius: '40px',
        backgroundColor: '#d9e0ff',
        height: '100vh',
        boxSizing: 'border-box'
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
        <span
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          LinguaStep
        </span>
      </Typography>

      <ProfileNavigationList />

      <List sx={{ marginTop: 'auto', width: '80%', paddingBottom: '16px' }} component="nav">
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              padding: '1px',
              '&:hover': {
                backgroundColor: 'rgba(91, 97, 250, 0.08)',
                borderTopRightRadius: '3rem',
                borderBottomRightRadius: '3rem',
              },
            }}
          >
            <ListItemText
              primary="Выйти"
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '22px',
                  color: 'text.secondary'
                },
                marginLeft: '30%'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  )
}

export { ProfileSidebarLeft }