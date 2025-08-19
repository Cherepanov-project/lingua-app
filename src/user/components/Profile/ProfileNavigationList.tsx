import { useState } from 'react'
import { List, ListItem, ListItemButton, ListItemText, type SxProps } from '@mui/material'

const items = ['Главная', 'Выбрать курс', 'Упражнения', 'Грамматика', 'Игры', 'Настройки']

const ProfileNavigationList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <List sx={list}>
      {items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={itemButton}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
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
