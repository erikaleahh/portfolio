import { useEffect, useState, type FocusEvent } from 'react'

export function useAutoCycle(count: number, delay: number, enabled = true) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const autoplay = enabled && !paused && !hovered && !focused && !reducedMotion && pageVisible

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), delay)
    return () => window.clearTimeout(timer)
  }, [autoplay, index, count, delay])

  return {
    index,
    paused,
    reducedMotion,
    autoplay,
    togglePaused: () => setPaused((current) => !current),
    select: (next: number) => { setIndex(next); setPaused(true) },
    interactionProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      },
    },
  }
}
