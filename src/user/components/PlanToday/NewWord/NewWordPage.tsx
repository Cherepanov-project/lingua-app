import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { NewWordCard } from './NewWordCard'
import { newWords, selectTheme } from '../../../../shared/constants/textConsts'
import { useGetNewWordsQuery } from '../../../../shared/api/newWordsApi'
import { ProgressBar } from '../../../../shared/components/ProgressBar'

export const NewWordPage: React.FC = () => {
  const { data: topics = [], isLoading } = useGetNewWordsQuery()

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
      <Typography variant="h4">{newWords}</Typography>
      <Typography sx={{ fontSize: '24px' }}>{selectTheme}</Typography>

      <Grid container spacing={3} mt={5}>
        {topics.map(topic => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={topic.id}>
            <NewWordCard title={topic.title} id={topic.id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
