import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux'
import { setFinished, setVisited } from '../../../../../store/reducers/ReaderPersistSlice'

export function useReadingModal() {
  const { id } = useParams()
  const { chunksByBook, currentChunkIndexByBook } = useAppSelector(state => state.reader)
  const savedVisited = useAppSelector(state => state.readerPersist.visited[id ?? ''])
  const savedFinished = useAppSelector(state => state.readerPersist.finished[id ?? ''])
  const dispatch = useAppDispatch()
  const currentChunkIndex = currentChunkIndexByBook[id ?? ''] ?? 0
  const chunks = chunksByBook[id ?? '']

  const prevIndexRef = useRef<number>(currentChunkIndex)
  const visitedRef = useRef<boolean[]>([])
  const [isCongratsOpen, setCongratsOpen] = useState(false)

  const [wasFinished, setWasFinished] = useState(() => {
    return savedFinished
  })

  useEffect(() => {
    if (!chunks || !id) return

    if (savedVisited) {
      visitedRef.current = [...savedVisited]
    } else {
      visitedRef.current = Array(chunks.length).fill(false)
      visitedRef.current[0] = true
    }

    prevIndexRef.current = currentChunkIndex
  }, [chunks, id])

  useEffect(() => {
    if (!chunks || !id) return

    const current = currentChunkIndex
    const prev = prevIndexRef.current

    const isSequentialForward = current === prev + 1

    if (isSequentialForward) {
      const updatedVisited = [...visitedRef.current]
      updatedVisited[current] = true
      visitedRef.current = updatedVisited
      dispatch(setVisited({ bookId: id, visited: visitedRef.current }))
    }

    prevIndexRef.current = current
  }, [currentChunkIndex, chunks, id])

  useEffect(() => {
    if (!chunks?.length) return

    const lastIndex = chunks.length - 1
    const allSequential = visitedRef.current.length === chunks.length && visitedRef.current.every(Boolean)
    const onLastPage = currentChunkIndex === lastIndex

    if (allSequential && onLastPage) {
      setCongratsOpen(true)
      if (!wasFinished) {
        setWasFinished(true)
        dispatch(setFinished({ bookId: String(id), finished: true }))
      }
    }
  }, [currentChunkIndex, chunks])

  return {
    isCongratsOpen,
    closeCongrats: () => setCongratsOpen(false),
  }
}
