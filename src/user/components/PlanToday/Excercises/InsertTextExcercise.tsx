import { useParams } from 'react-router-dom'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { Check, EngLanguage, MissWords, ReadingPractice } from '../../../../shared/constants/textConsts'
import { useGrammarExercise } from '../../Grammar/hooks/useGrammarExercise'
import { useGetExercisesInsertTextByLevelQuery } from '../../../../shared/api/exercisesInsertTextApi'
import { ProgressBar } from '../../../../shared/components/ProgressBar'
import { PlanTodayLayout } from '../PlanTodayLayout'

export const InsertTextExcercise = () => {
  const { level } = useParams()
  const { data: exercise, isLoading } = useGetExercisesInsertTextByLevelQuery(`${level}`)

  const missing_words = exercise?.missing_words ?? []
  const sentence = exercise?.sentence ?? ''

  const { userAnswers, isChecked, result, handleChange, handleCheck } = useGrammarExercise(missing_words)

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <PlanTodayLayout>
      <Stack
        sx={{
          alignItems: 'center',
          padding: '20px',
          width: '100%',
        }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {ReadingPractice}
        </Typography>

        <Typography variant="h6" sx={{ color: '#666', mb: 3 }}>
          {EngLanguage} {level}
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          {MissWords}
        </Typography>

        <Typography
          component="div"
          sx={{
            backgroundColor: '#f6f8ff',
            borderRadius: '1rem',
            padding: '20px',
            maxWidth: '800px',
            lineHeight: 1.8,
            textAlign: 'center',
            fontSize: '1.2rem',
          }}>
          {sentence.split('____').map((part, index) => (
            <span key={index}>
              {part}
              {index < missing_words.length && (
                <TextField
                  variant="outlined"
                  size="small"
                  value={userAnswers[index]}
                  onChange={e => handleChange(index, e.target.value)}
                  sx={{
                    width: '105px',
                    mx: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '1rem',
                    },
                    '& .MuiInputBase-input': {
                      py: '5px', 
                    },
                  }}
                />
              )}
            </span>
          ))}
        </Typography>

        <Button
          variant="contained"
          onClick={handleCheck}
          sx={{
            borderRadius: '3rem',
            mt: 4,
            backgroundColor: '#d2daff',
            color: 'black',
            fontWeight: 'bold',
          }}>
          {Check}
        </Button>

        {isChecked && (
          <Typography sx={{ mt: 3, fontWeight: 'bold', color: result?.includes('правильные') ? 'green' : 'red' }}>
            {result}
          </Typography>
        )}
      </Stack>
    </PlanTodayLayout>
  )
}
