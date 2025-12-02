import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Paper, Grid } from '@mui/material'
import { useGetNewWordsQuery } from '../../../../shared/api/newWordsApi'
import { PlanTodayLayout } from '../PlanTodayLayout'

export const WordsPage: React.FC = () => {
  const { data: topics = [] } = useGetNewWordsQuery()
  const { id } = useParams<{ id: string }>()
  const topic = topics.find(t => t.id === Number(id))

  if (!topic) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5">Тема не найдена</Typography>
      </Box>
    )
  }

  return (
    <PlanTodayLayout>
      <Box sx={{ maxWidth: 900, minWidth: 600, mx: 'auto', p: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          {topic.title}
        </Typography>

        <Grid container spacing={15} mt={5}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
              Русский
            </Typography>
            {topic.words.map(word => (
              <Paper
                key={word.id}
                sx={{
                  p: 2,
                  mb: 2,
                  textAlign: 'center',
                  fontSize: '1.3rem',
                  borderRadius: '16px',
                  backgroundColor: '#D2DAFF',
                }}
                elevation={2}>
                {word.ru}
              </Paper>
            ))}
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
              English
            </Typography>
            {topic.words.map(word => (
              <Paper
                key={word.id}
                sx={{
                  p: 2,
                  mb: 2,
                  textAlign: 'center',
                  fontSize: '1.3rem',
                  borderRadius: '16px',
                  backgroundColor: '#D2DAFF',
                }}
                elevation={2}>
                {word.en}
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Box>
    </PlanTodayLayout>
  )
}
