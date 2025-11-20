import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../../../shared/hooks/redux"

export function useReadingModal() {
  const { id } = useParams()
  const { chunksByBook, currentChunkIndexByBook } = useAppSelector(state => state.reader)
  const currentChunkIndex = currentChunkIndexByBook[id ?? ""] ?? 0
  const chunks = chunksByBook[id ?? ""]

  const prevIndexRef = useRef<number>(currentChunkIndex)
  const visitedRef = useRef<boolean[]>([])
  const [isCongratsOpen, setCongratsOpen] = useState(false)

  const [wasFinished, setWasFinished] = useState(() => {
    return localStorage.getItem(`reader-finished-${id}`) === "1"
  })

  useEffect(() => {
    if (!chunks || !id) return

    const saved = localStorage.getItem(`reader-visited-${id}`)

    if (saved) {
      visitedRef.current = JSON.parse(saved)
    } else {
      visitedRef.current = Array(chunks.length).fill(false)
      visitedRef.current[0] = true 
    }

    prevIndexRef.current = currentChunkIndex
  }, [chunks, id, currentChunkIndex])

  useEffect(() => {
    if (!chunks || !id) return

    const current = currentChunkIndex
    const prev = prevIndexRef.current

    const isSequentialForward = current === prev + 1

    if (isSequentialForward) {
      visitedRef.current[current] = true
      localStorage.setItem(
        `reader-visited-${id}`,
        JSON.stringify(visitedRef.current)
      )
    }

    prevIndexRef.current = current
  }, [currentChunkIndex, chunks, id])

  useEffect(() => {
    if (!chunks?.length) return

    const lastIndex = chunks.length - 1

    const allSequential =
      visitedRef.current.length === chunks.length &&
      visitedRef.current.every(Boolean)

    const onLastPage = currentChunkIndex === lastIndex

    if (allSequential && onLastPage && !wasFinished) {
      setCongratsOpen(true)
      setWasFinished(true)
      localStorage.setItem(`reader-finished-${id}`, "1")
    }
  }, [currentChunkIndex, chunks, id, wasFinished])


  return {
    isCongratsOpen,
    closeCongrats: () => setCongratsOpen(false),
  }
}
