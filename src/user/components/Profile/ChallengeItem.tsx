import type { SxProps } from '@mui/material'
import { Box } from '@mui/material'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface ChallengeItemProps {
  itemTitle: string
  imageUrl: string
  link: string
}

const ChallengeItem: React.FC<ChallengeItemProps> = ({ itemTitle, imageUrl, link }) => {
  return (
    <Stack sx={challengeItem}>
      <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          {itemTitle}
        </Typography>
        <img style={{ width: '17%', display: 'block', marginBottom: '10px' }} src={imageUrl} />
      </Box>
      <Box>
        <Button sx={challengeButton} variant="outlined" component={Link} to={link}>
          Начать
        </Button>
      </Box>
    </Stack>
  )
}

export { ChallengeItem }

///////////////////////////////////////////////////////////////////////////////

const challengeItem: SxProps = {
  backgroundColor: '#eeeeee',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px 20px',
  borderRadius: '40px',
  width: 215,
}

const challengeButton: SxProps = {
  padding: '2px 30px',
  borderRadius: '2rem',
  border: '1px solid #000000',
  color: '#000000',
  textTransform: 'inherit',

  '&:hover': {
    backgroundColor: '#7E94F9',
    border: '1px solid #7E94F9',
    color: '#ffffff',
  },
}
