import { useNavigate } from 'react-router-dom'
import { Container, Stack, Card, CardContent, Typography, Button, Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux'
import { readerSlice, type BookItem } from '../../../../store/reducers/Reading'
import { useReadingProgress } from './hooks/useReadingProgress'
import { Books, Continue, KeepReading, NoBooksProcessReading, OpenBooks, ProgressSave, ToRead } from '../../../../shared/constants/textConsts'

export function BooksListPage() {
  const {books, chunksByBook} = useAppSelector(state => state.reader)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { setCurrentBook } = readerSlice.actions

  const { readingNow } = useReadingProgress(books, chunksByBook)

  const openReader = (book: BookItem) => {
    dispatch(setCurrentBook(book.id))
    navigate(`/profile/reader/${book.id}`, { state: { url: book.url, title: book.title } })
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: 24 }}>
      <Typography variant="h4" gutterBottom>
        {Books}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <Box sx={{ width: '50%' }}>
          <Typography variant="h5" gutterBottom>
            {OpenBooks}
          </Typography>
          <Stack spacing={2}>
            {books.map((b: BookItem) => (
              <Card key={b.id} variant="outlined">
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  
                  <Typography variant="h6">{b.title}</Typography>
                  
                  <Button variant="contained" onClick={() => openReader(b)}>
                    {ToRead}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Box sx={{ width: '50%' }}>
          <Typography variant="h5" gutterBottom>
            {KeepReading}
          </Typography>

          {readingNow.length === 0 && (
            <Typography color="textSecondary">{NoBooksProcessReading}</Typography>
          )}

          <Stack spacing={2}>
            {readingNow.map(b => (
              <Card key={b.id} variant="outlined" sx={{ borderLeft: '4px solid #4caf50' }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Typography variant="h6">{b.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {ProgressSave}
                    </Typography>
                  </div>
                  <Button variant="contained" color="success" onClick={() => openReader(b)}>
                    {Continue}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}
