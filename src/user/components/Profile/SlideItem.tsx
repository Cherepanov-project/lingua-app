import { Box, Stack, Typography } from '@mui/material'
import type { SliderItem } from '../../../types/swiperTypes'

interface SliderItemProps extends SliderItem {
  title: string
  imageUrl: string
}

const SlideItem: React.FC<SliderItemProps> = ({ title, imageUrl }) => {
  return (
    <Stack sx={{ alignItems: 'center', width: '94px' }}>
      <Box>
        <img src={imageUrl} alt="title" style={{ width: '100%' }} />
      </Box>
      <Typography sx={{ fontSize: '20px', color: '#676565', textAlign: 'center' }}>
        {title}
      </Typography>
    </Stack>
  )
}

export { SlideItem }
