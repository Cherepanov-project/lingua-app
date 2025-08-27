import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { ProfileWidgetSlider } from './ProfileWidgetSlider'
import { mockDataGamesSlider } from './constants'

const ProfileWidgetGames = () => {
  return (
    <Stack>
      <Stack className="car" sx={{ minHeight: '100px' }}>
        <Typography variant="h4">Игры</Typography>
        <Typography sx={{ color: '#878787', fontSize: '20px' }}>Играй и забирай звезды</Typography>
      </Stack>
      <ProfileWidgetSlider itemList={mockDataGamesSlider} />
    </Stack>
  )
}

export { ProfileWidgetGames }
