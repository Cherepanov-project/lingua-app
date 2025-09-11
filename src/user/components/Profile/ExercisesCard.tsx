import { type SxProps } from '@mui/material'
import { Box } from '@mui/material'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { LinearProgress } from '@mui/material'

interface ExercisesCardProps {
  id?: string
  type?: string
  name: string
  text: string
  imageUrl: string
  questions?: []
  progress: number
}

const ExercisesCard: React.FC<ExercisesCardProps> = ({ name, text, progress, imageUrl }) => {
  return (
    <Stack
      sx={{
        padding: '25px 55px',
        borderRadius: '40px',
        backgroundColor: '#d2daff',
      }}
    >
      <Stack direction={'row'}>
        <Stack sx={{ width: '100%' }} direction={'row'} spacing={5} useFlexGap>
          <Box sx={{ width: '146px', height: '146px' }}>
            <img style={{ width: '100%' }} src={imageUrl} />
          </Box>
          <Stack sx={{ width: '65%' }} spacing={3}>
            <Box>
              <Typography variant="h4">{name}</Typography>
              <Typography gutterBottom color="#878787">
                {text}
              </Typography>
            </Box>
            <LinearProgress sx={linearProgress} variant="determinate" value={progress} />
          </Stack>
        </Stack>
      </Stack>
      <Button sx={button} variant="contained">
        Начать
      </Button>
    </Stack>
  )
}

export { ExercisesCard }

///////////////////////////////////////////////////////////////////////////////

const linearProgress: SxProps = {
  height: '10px',
  borderRadius: '3rem',
  backgroundColor: 'white',

  '& .MuiLinearProgress-bar': {
    borderRadius: '3rem',
  },
}

const button: SxProps = {
  padding: '0 20px',
  paddingInline: '40px',
  borderRadius: '3rem',
  color: 'white',
  alignSelf: 'flex-end',
  fontSize: '20px',
  textTransform: 'capitalize',
}
