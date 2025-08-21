import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { ProfileWidgetSlider } from './ProfileWidgetSlider'

const sliderData = [
  {
    title: 'Квиз',
    imageUrl: './game-image-synchronize.png',
  },
  {
    title: 'Найди пару',
    imageUrl: './game-image-tickets.png',
  },
  {
    title: 'Пазл',
    imageUrl: './game-image-puzzle.png',
  },
  {
    title: 'Квиз',
    imageUrl: './game-image-synchronize.png',
  },
  {
    title: 'Найди пару',
    imageUrl: './game-image-tickets.png',
  },
  {
    title: 'Пазл',
    imageUrl: './game-image-puzzle.png',
  },
]

const ProfileWidgetGames = () => {
  return (
    <Stack>
      <Stack className="car" sx={{ minHeight: '100px' }}>
        <Typography variant="h4">Игры</Typography>
        <Typography sx={{ color: '#878787', fontSize: '20px' }}>Играй и забирай звезды</Typography>
      </Stack>
      <ProfileWidgetSlider itemList={sliderData} />
    </Stack>
  )
}

export { ProfileWidgetGames }
