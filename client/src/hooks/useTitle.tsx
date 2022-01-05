import { useEffect } from 'react'

export const useTitle = (title: string) => {
  useEffect(() => {
    title && (document.title = title)
  }, [title])
}
