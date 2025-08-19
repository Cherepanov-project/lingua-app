import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { Box } from '@mui/material'

interface GrammarItemProps {
  title: string
  imageUrl: string
}

const GrammarItem: React.FC<GrammarItemProps> = ({ title, imageUrl }) => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        maxWidth: '94px',
        borderRadius: '10px',
        transition: 'outlineColor 0.5s, outlineStyle 0.5s',

        '&:hover': {
          outlineColor: '#eeeeee',
          outlineStyle: 'solid',
        },
      }}
    >
      <Box>
        <img src={imageUrl} alt="title" style={{ width: '100%' }} />
      </Box>
      <Typography sx={{ fontSize: '20px', color: '#676565', textAlign: 'center' }}>
        {title}
      </Typography>
    </Stack>
  )
}

const ProfileWidgetGrammar = () => {
  return (
    <Stack>
      <Stack sx={{ minHeight: '100px' }}>
        <Typography variant="h4">Грамматика</Typography>
      </Stack>
      <Stack direction={'row'} spacing={'20px'}>
        <GrammarItem title="Present Simple" imageUrl="./grammar-image-document.png"></GrammarItem>
        <GrammarItem title="Present Perfect" imageUrl="./grammar-image-document.png"></GrammarItem>
        <GrammarItem title="Past Simple" imageUrl="./grammar-image-document.png"></GrammarItem>
      </Stack>
    </Stack>
  )
}

export { ProfileWidgetGrammar }
