import React from 'react'
import { Typography, Paper, Grid, TextField, Button, Stack } from '@mui/material'
import { Check, EngLanguage, WordsTranslate } from '../../../../shared/constants/textConsts'
import { useParams } from 'react-router-dom'
import { useGrammarExercise } from '../../Grammar/hooks/useGrammarExercise'
import { useGetWordsTranslateByLevelQuery } from '../../../../shared/api/wordsTranslateApi'
import { ProgressBar } from '../../../../shared/components/ProgressBar'
import { PlanTodayLayout } from '../PlanTodayLayout'

export const WordsExercises: React.FC = () => {
  const { level } = useParams()
  const {data: list, isLoading} = useGetWordsTranslateByLevelQuery(`${level}`)
  const missing_words = list?.words_en ?? []
  const { userAnswers, isChecked, result, handleChange, handleCheck } = useGrammarExercise(missing_words)
  
  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <PlanTodayLayout>
      <Stack
        sx={{
          alignItems: 'center',
          padding: '15px',
          width: '100%',
          mx: 'auto',
        }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          {WordsTranslate}
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ color: '#666', mb: 3 }}>
          {EngLanguage} {level}
        </Typography>

        <Grid container spacing={15} mt={5}>
          <Grid size={{ xs: 6 }}>
            {list?.words_ru.map((word, i) => (
              <Paper
                key={i}
                sx={{
                  p: 2,
                  mb: 2,
                  textAlign: 'center',
                  fontSize: '1.3rem',
                  borderRadius: '16px',
                  backgroundColor: '#D2DAFF',
                }}
                elevation={2}>
                {word}
              </Paper>
            ))}
          </Grid>

          <Grid size={{ xs: 6 }}>
            {list?.words_ru.map((_, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  textAlign: 'center',
                  borderRadius: '16px',
                  backgroundColor: '#D2DAFF',
                }}
                elevation={2}>
                <TextField
                  variant="standard"
                  size="small"
                  value={userAnswers[index]}
                  onChange={e => handleChange(index, e.target.value)}
                  sx={{
                    width: '60%',
                    mx: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '1rem',
                    },
                    '& .MuiInputBase-input': {
                      py: '5px',
                    },
                  }}
                />
              </Paper>
            ))}
          </Grid>
        </Grid>
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
