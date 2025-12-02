import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Back } from '../../../shared/constants/textConsts'
import { BackButton } from '../Grammar/GrammarLayout'

export const PlanTodayLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  return (
    <Box padding="20px" sx={{ width: '100%', overflowY: 'auto', scrollbarColor: '#d9e0ff transparent' }}>
      <Button sx={{ ...BackButton, ml: 2 }} onClick={() => navigate(-1)}>
        {Back}
      </Button>

      {children}
    </Box>
  )
}
