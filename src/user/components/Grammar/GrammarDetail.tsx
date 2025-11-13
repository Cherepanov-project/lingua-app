import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { Exercise } from '../../../shared/constants/textConsts'
import { BackButton, GrammarLayout } from './GrammarLayout'
import { useUserMeta } from '../../features/hooks/useUserMeta'

export const GrammarDetailPage = () => {
  const {meta} = useUserMeta()
  return (
    <GrammarLayout>
      {grammarItem => (
      <Box padding="20px">
        <Typography variant="h3" sx={{ mt: 2, mb: 3 }}>
          {grammarItem.title}
        </Typography>

        <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
          {grammarItem.text}
        </Typography>

        <Button
          sx={{...BackButton, mt: 2}}
          component={Link}
          to={`${meta?.level}`}>
          {Exercise}
        </Button>
      </Box>
      )}
    </GrammarLayout>
  )
}
