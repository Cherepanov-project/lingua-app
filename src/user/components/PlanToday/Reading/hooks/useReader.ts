import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux'
import { setChunksForBook, setCurrentBook, setCurrentChunkIndex } from '../../../../../store/reducers/Reading'
import { useGetBookHtmlQuery } from '../../../../../shared/api/bookApi'
import { splitHtmlByParagraphs } from '../utils'
import { setProgress } from '../../../../../store/reducers/ReaderPersistSlice'


export function useReader() {
  const { id } = useParams()
  const location = useLocation()
  const { url, title } = location.state
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) dispatch(setCurrentBook(id))
  }, [id, dispatch, setCurrentBook])
  
  const saved = useAppSelector(state => state.readerPersist.progress[id ?? ""])
  const { chunksByBook, currentChunkIndexByBook, maxCharsPerChunk } = useAppSelector(state => state.reader)
  const currentChunkIndex = currentChunkIndexByBook[id ?? ''] ?? 0
  const chunks = chunksByBook[id ?? '']
  
  const { data: htmlText, isLoading, error } = useGetBookHtmlQuery(url, { skip: !url })

  useEffect(() => {
  if (htmlText && !chunks) {
    const newChunks = splitHtmlByParagraphs(htmlText, maxCharsPerChunk)

    dispatch(setChunksForBook({ bookId: id, chunks: newChunks }))
  }
}, [htmlText, chunks, maxCharsPerChunk, dispatch, id, setChunksForBook])

  useEffect(() => {
    if (!id || chunks == null) return
    dispatch(setProgress({ bookId: id, index: currentChunkIndex }))
  }, [currentChunkIndex, id, chunks])

  useEffect(() => {
    if (!id || !chunks) return
    if (saved) {
      dispatch(setCurrentChunkIndex({ bookId: id, index: Number(saved) }))
    }
  }, [chunks, id, dispatch, setCurrentChunkIndex])

  const goNext = () => {
    if (!chunks) return
    dispatch(
      setCurrentChunkIndex({
        bookId: id!,
        index: Math.min(currentChunkIndex + 1, chunks.length - 1),
      }),
    )
  }

  const goPrev = () => {
    dispatch(
      setCurrentChunkIndex({
        bookId: id!,
        index: Math.max(currentChunkIndex - 1, 0),
      }),
    )
  }

  const goToPage = (page: number) => {
    if (!chunks || page < 1 || page > chunks.length) return

    dispatch(
      setCurrentChunkIndex({
        bookId: id!,
        index: page - 1,
      }),
    )
  }

  const currentChunkHtml = useMemo(() => chunks?.[currentChunkIndex], [chunks, currentChunkIndex])

  return {
    title,
    chunks,
    currentChunkHtml,
    currentChunkIndex,
    isLoading,
    error,
    goNext,
    goPrev,
    goToPage,
  }
}
