import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function RouteNavigation() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    document.title = pathname === '/' ? 'Portfolio — Foundation' : 'Page not found — Portfolio'
    let id = ''
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
    }
    const target = id ? document.getElementById(id) : null
    if (target) {
      target.focus({ preventScroll: true })
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash, key])

  return null
}
