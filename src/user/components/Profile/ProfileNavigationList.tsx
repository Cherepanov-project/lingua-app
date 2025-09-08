import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { ListItemText } from '@mui/material'
import { type SxProps } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const navigationItems = [
  { text: 'Главная', path: '/profile' },
  { text: 'Выбрать курс', path: '/profile/courses' },
  { text: 'Упражнения', path: '/profile/exercises' },
  { text: 'Грамматика', path: '/profile/grammar' },
  { text: 'Игры', path: '/profile/games' },
  { text: 'Настройки', path: '/profile/settings' },
]

const ProfileNavigationList = () => {
  const location = useLocation()

  return (
    <List sx={list} component="nav">
      {navigationItems.map((item) => {
        const isActive =
          item.path === '/profile'
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path)

        return (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              sx={itemButton}
              component={RouterLink}
              to={item.path}
              selected={isActive}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export { ProfileNavigationList }

const list: SxProps = {
  width: '80%',
}

const itemButton: SxProps = {
  padding: '1px',

  '&:hover': {
    borderTopRightRadius: '3rem',
    borderBottomRightRadius: '3rem',
  },

  '&.Mui-selected': {
    backgroundColor: '#ffffff',
    borderTopRightRadius: '3rem',
    borderBottomRightRadius: '3rem',
  },

  '& .MuiListItemText-root': {
    marginLeft: '30%',
    fontSize: '22px',
  },

  '& .MuiTypography-root': {
    fontSize: '22px',
  },
}
