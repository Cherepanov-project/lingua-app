import { useEffect, useState } from 'react'
import type { BookItem } from '../../../../../store/reducers/Reading'
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux'
import { setFinished } from '../../../../../store/reducers/ReaderPersistSlice'

export const useReadingProgress = (books: BookItem[], chunksByBook: Record<string, string[] | undefined>) => {
  const [readingNow, setReadingNow] = useState<BookItem[]>([])
  const [notStarted, setNotStarted] = useState<BookItem[]>([])
  const dispatch = useAppDispatch();

  const progressByBook = useAppSelector(state => state.readerPersist.progress)
  const finishedByBook = useAppSelector(state => state.readerPersist.finished)

  useEffect(() => {
    const reading: BookItem[] = []
    const notReading: BookItem[] = []

    for (const b of books) {
      const savedIndex = progressByBook[b.id]
      const isFinishedFlag = finishedByBook[b.id] === true
      const chunks = chunksByBook[b.id]
      const totalPages = chunks?.length ?? 0

      const reachedEnd = savedIndex !== undefined && totalPages > 0 && savedIndex + 1 >= totalPages;

      // Если книга полностью прочитана и мы ещё не ставили флаг
      if (reachedEnd && !isFinishedFlag) {
        dispatch(setFinished({ bookId: b.id, finished: true }));
      }

      let isFinished = isFinishedFlag || reachedEnd;

      // Если пользователь открыл книгу заново и листает не последнюю страницу
      if (isFinished && savedIndex !== undefined && savedIndex + 1 < totalPages) {
        isFinished = false;
        dispatch(setFinished({ bookId: b.id, finished: false }));
      }

      if (savedIndex === undefined) {
        // книга не начиналась
        notReading.push(b);
      } else if (!isFinished) {
        // книга в процессе чтения
        reading.push(b);
      }
    }

    setReadingNow(reading)
    setNotStarted(notReading)
  }, [books, chunksByBook, progressByBook, finishedByBook])

  return { readingNow, notStarted, progressByBook }
}
