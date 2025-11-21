import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux'
import { readerSlice } from '../../../../../store/reducers/Reading'
import { useGetBookHtmlQuery } from '../../../../../shared/api/bookApi'
import { splitHtmlByParagraphs } from '../utils'


export function useReader() {
  const { id } = useParams()
  const location = useLocation()
  const { url, title } = location.state

  const dispatch = useAppDispatch()
  const { setCurrentBook, setCurrentChunkIndex, setChunksForBook } = readerSlice.actions

  useEffect(() => {
    if (id) dispatch(setCurrentBook(id))
  }, [id, dispatch, setCurrentBook])
  
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
    localStorage.setItem(`reader-progress-${id}`, JSON.stringify(currentChunkIndex))
  }, [currentChunkIndex, id, chunks])

  useEffect(() => {
    if (!id || !chunks) return
    const saved = localStorage.getItem(`reader-progress-${id}`)
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
