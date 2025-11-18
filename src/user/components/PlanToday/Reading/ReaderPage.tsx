import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useReader } from './hooks/useReader'
import { Back, EmptyBook, ErrBook, Further, GoPage } from '../../../../shared/constants/textConsts'
import { useState } from 'react'

export const ReaderPage = () => {
  const [pageInput, setPageInput] = useState('')
  const { 
    title, chunks, currentChunkHtml, currentChunkIndex,
    isLoading, error, goNext, goPrev, goToPage
  } = useReader()


  if (isLoading) {
      return (
        <Box
          sx={{
            flexGrow: "1",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="100px" />
        </Box>
      );
    }

  if (error)
    return (
      <Typography sx={{ p: 3 }} color="error">
        {ErrBook}
      </Typography>
    )

  if (!chunks)
    return (
      <Typography sx={{ p: 3 }} color="text.secondary">
        {EmptyBook}
      </Typography>
    )

  return (
    <Box sx={{ p: 3, width: '65%', m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <iframe
        title={title}
        srcDoc={currentChunkHtml}
        style={{ width: '100%', height: '70vh', border: '1px solid #ccc', borderRadius: 8 }}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="outlined" disabled={currentChunkIndex === 0} onClick={goPrev}>
          {Back}
        </Button>
        <Typography variant="h5">
          {currentChunkIndex + 1} of {chunks.length}
        </Typography>
        <Button variant="contained" disabled={currentChunkIndex >= chunks.length - 1} onClick={goNext}>
          {Further}
        </Button>
        <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
        <TextField
          size="small"
          label="Страница"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          type="number"
          sx={{maxWidth: '120px'}}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (!pageInput) return
            goToPage(Number(pageInput))
          }}
        >
          {GoPage}
        </Button>
      </Box>
      </Box>
    </Box>
  )
}
