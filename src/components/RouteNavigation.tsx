import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { portfolio } from '../data'

export function RouteNavigation() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    document.title =
      pathname === '/'
        ? `${portfolio.fullName ?? 'Portfolio'} — Creative Developer`
        : 'Page not found — Portfolio'
    const location = [portfolio.location.city, portfolio.location.country]
      .filter(Boolean)
      .join(', ')
    const description =
      pathname === '/'
        ? `${portfolio.fullName ?? 'Creative developer'} — ${portfolio.role} based in ${location}. ${portfolio.tagline}`
        : 'This page could not be found. Return to the portfolio to explore work and make a connection.'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', document.title)
    let id = ''
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {}
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
