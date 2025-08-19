import { Box } from '@mui/material'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'

interface GameItemProps {
  title: string
  imageUrl: string
}

const GameItem: React.FC<GameItemProps> = ({ title, imageUrl }) => {
  return (
    <Stack sx={{ alignItems: 'center', maxWidth: '94px' }}>
      <Box>
        <img src={imageUrl} alt="title" style={{ width: '100%' }} />
      </Box>
      <Typography sx={{ fontSize: '20px', color: '#676565', textAlign: 'center' }}>
        {title}
      </Typography>
    </Stack>
  )
}

const ProfileWidgetGames = () => {
  return (
    <>
      <Stack sx={{ minHeight: '100px' }}>
        <Typography variant="h4">Игры</Typography>
        <Typography sx={{ color: '#878787', fontSize: '20px' }}>Играй и забирай звезды</Typography>
      </Stack>
      <Stack direction={'row'} spacing={'20px'}>
        <GameItem title="Квиз" imageUrl="./game-image-synchronize.png"></GameItem>
        <GameItem title="Найди пару" imageUrl="./game-image-tickets.png"></GameItem>
        <GameItem title="Пазл" imageUrl="./game-image-puzzle.png"></GameItem>
      </Stack>
    </>
  )
}

export { ProfileWidgetGames }
