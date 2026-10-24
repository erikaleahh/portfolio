import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sectionLinks, type SectionId } from '../data/navigation'

export function useActiveSection() {
  const { pathname } = useLocation()
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    if (pathname !== '/') return
    let frame = 0
    const update = () => {
      let next: SectionId = 'home'
      const threshold = Math.max(120, window.innerHeight * 0.3)
      for (const { id } of sectionLinks) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= threshold)
          next = id
      }
      setActive(next)
      frame = 0
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  return pathname === '/' ? active : null
}
