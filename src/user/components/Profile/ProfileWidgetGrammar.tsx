import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { ProfileWidgetSlider } from './ProfileWidgetSlider'
import { mockDataGrammarSlider } from './constants'

const ProfileWidgetGrammar = () => {
  return (
    <Stack>
      <Stack sx={{ minHeight: '100px' }}>
        <Typography variant="h4">Грамматика</Typography>
      </Stack>
      <ProfileWidgetSlider itemList={mockDataGrammarSlider} />
    </Stack>
  )
}

export { ProfileWidgetGrammar }
