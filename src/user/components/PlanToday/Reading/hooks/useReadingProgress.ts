import { useEffect, useState } from "react"
import type { BookItem } from "../../../../../store/reducers/Reading"

export const useReadingProgress = (books: BookItem[], chunksByBook: Record<string, string[] | undefined>) => {
  const [readingNow, setReadingNow] = useState<BookItem[]>([])
  const [notStarted, setNotStarted] = useState<BookItem[]>([])

  useEffect(() => {
    const reading: BookItem[] = []
    const notReading: BookItem[] = []

    for (const b of books) {
      const saved = localStorage.getItem(`reader-progress-${b.id}`)
      const savedIndex = Number(saved)
      const chunks = chunksByBook[b.id]
      const totalPages = chunks?.length
      const isFinished = savedIndex + 1 >= totalPages!
      if (isFinished) {
        localStorage.removeItem(`reader-progress-${b.id}`)
        notReading.push(b)
      } 
      if (saved) reading.push(b)
      else notReading.push(b) 
    }

    setReadingNow(reading)
    setNotStarted(notReading)
  }, [books, chunksByBook])

  return { readingNow, notStarted }
}