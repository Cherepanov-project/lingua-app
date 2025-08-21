import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { ProfileWidgetSlider } from './ProfileWidgetSlider'

const sliderData = [
  {
    title: 'Present Simple',
    imageUrl: './grammar-image-document.png',
  },
  {
    title: 'Present Perfect',
    imageUrl: './grammar-image-document.png',
  },
  {
    title: 'Past Simple',
    imageUrl: './grammar-image-document.png',
  },
  {
    title: 'Present Simple',
    imageUrl: './grammar-image-document.png',
  },
  {
    title: 'Present Perfect',
    imageUrl: './grammar-image-document.png',
  },
  {
    title: 'Past Simple',
    imageUrl: './grammar-image-document.png',
  },
]

const ProfileWidgetGrammar = () => {
  return (
    <Stack>
      <Stack sx={{ minHeight: '100px' }}>
        <Typography variant="h4">Грамматика</Typography>
      </Stack>
      <ProfileWidgetSlider itemList={sliderData} />
    </Stack>
  )
}

export { ProfileWidgetGrammar }
