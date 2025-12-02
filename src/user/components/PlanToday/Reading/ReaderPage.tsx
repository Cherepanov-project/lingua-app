import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { useReader } from './hooks/useReader'
import {
  Back,
  BookList,
  Complete,
  Congratulate,
  EmptyBook,
  ErrBook,
  Further,
  GoPage,
} from '../../../../shared/constants/textConsts'
import { useState } from 'react'
import { useReadingModal } from './hooks/useReadingModal'
import { useNavigate } from 'react-router-dom'
import { PlanTodayLayout } from '../PlanTodayLayout'

export const ReaderPage = () => {
  const [pageInput, setPageInput] = useState('')
  const { title, chunks, currentChunkHtml, currentChunkIndex, isLoading, error, goNext, goPrev, goToPage } = useReader()
  const { isCongratsOpen, closeCongrats } = useReadingModal()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Box
        sx={{
          flexGrow: '1',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress size="100px" />
      </Box>
    )
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
    <PlanTodayLayout>
      <Box
        sx={{
          p: 3,
          width: '96%',
          m: 'auto',
          mt: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '20px',
          border: '4px solid #d9e1ff',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>

        <iframe
          title={title}
          srcDoc={currentChunkHtml}
          style={{
            width: '100%',
            height: '75vh',
            border: '1px solid #ccc',
            borderRadius: 8,
            overflowY: 'hidden',
            background: '#F5F5F5',
          }}
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
              onChange={e => setPageInput(e.target.value)}
              type="number"
              sx={{ maxWidth: '120px' }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (!pageInput) return
                goToPage(Number(pageInput))
              }}>
              {GoPage}
            </Button>
          </Box>
        </Box>
        <Dialog open={isCongratsOpen} onClose={closeCongrats}>
          <DialogTitle>{Congratulate}</DialogTitle>
          <DialogContent>
            <Typography>{Complete}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                navigate(-1)
              }}>
              {BookList}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PlanTodayLayout>
  )
}
