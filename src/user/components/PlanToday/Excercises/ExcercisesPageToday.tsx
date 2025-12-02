import { Stack, Typography } from '@mui/material'
import { exercises, practice } from '../../Exercises/ListeningSkills/listeningConst.ts'
import { ExerciseCard } from './ExcerciseCard.tsx'
import { useUserMeta } from '../../../features/hooks/useUserMeta.ts'
import { InsertWords, ReadingPractice, SpellingTraining, WriteCorrectly } from '../../../../shared/constants/textConsts.ts'
import { PlanTodayLayout } from '../PlanTodayLayout.tsx'

export const ExercisesPageToday = () => {
  const { meta } = useUserMeta()
  return (
    <PlanTodayLayout>
      <Stack
        sx={{
          padding: '40px 70px 0 60px',
          flexGrow: '1',
          overflowY: 'scroll',
          scrollbarColor: '#d9e0ff transparent',
        }}>
        <Typography variant="h4">{exercises}</Typography>
        <Typography sx={{ fontSize: '24px' }}>{practice}</Typography>
        <Stack spacing={2} sx={{ height: '80%', marginTop: '30px' }}>
          <ExerciseCard
            name={ReadingPractice}
            text={InsertWords}
            imageUrl="/exercises-image-notepad.png"
            nav={`/profile/exercises-today/text/${meta?.level}`}
          />
          <ExerciseCard
            name={SpellingTraining}
            text={WriteCorrectly}
            imageUrl="/exercises-image-pencil.png"
            nav={`/profile/exercises-today/words/${meta?.level}`}
          />
        </Stack>
      </Stack>
    </PlanTodayLayout>
  )
}
