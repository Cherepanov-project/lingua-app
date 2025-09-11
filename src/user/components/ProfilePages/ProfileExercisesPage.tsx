import { type SxProps } from '@mui/material'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { LinearProgress } from '@mui/material'
import { ExercisesCard } from '../Profile/ExercisesCard'
import { percentage } from '../../utils/percentage'
import { mockDataExercisesCard } from '../Profile/mockDataSlider'

const ProfileExercisesPage = () => {
  return (
    <Stack sx={{ padding: '70px', flexGrow: '1' }}>
      <Typography variant="h4">Упражнения</Typography>
      <Typography sx={{ fontSize: '24px' }}>
        Тренируйтесь каждый день, чтобы закрепить знания
      </Typography>
      <Stack
        sx={{ marginBottom: '40px', alignItems: 'end' }}
        direction={'row'}
        spacing={7}
        useFlexGap
      >
        <Stack sx={{ flexGrow: '1' }}>
          <Typography sx={{ fontSize: '20px', color: '#878787' }} gutterBottom>
            Выполнено 12 из 20
          </Typography>
          <LinearProgress
            sx={mainLinearProgress}
            variant="determinate"
            value={percentage(12, 20)}
          ></LinearProgress>
        </Stack>
        <Button sx={mainButton} variant="contained">
          Продолжить
        </Button>
      </Stack>
      <Stack spacing={2}>
        {mockDataExercisesCard.map((exercise) => {
          return (
            <ExercisesCard
              name={exercise.name}
              text={exercise.text}
              type={exercise.type}
              imageUrl={exercise.imageUrl}
              progress={Math.random() * 100}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export { ProfileExercisesPage }

///////////////////////////////////////////////////////////////////////////////

const mainLinearProgress: SxProps = {
  height: '10px',
  borderRadius: '3rem',
  backgroundColor: '#d9d9d9',

  '& .MuiLinearProgress-bar': {
    borderRadius: '3rem',
  },
}

const mainButton: SxProps = {
  borderRadius: '3rem',
  color: 'white',
  padding: '15px 30px',
  fontSize: '20px',
  textTransform: 'capitalize',
}
