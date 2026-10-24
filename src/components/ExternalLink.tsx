import type { ComponentProps } from 'react'
import { isWebUrl } from '../utils/links'

// Missing and malformed destinations never become clickable placeholder links.
export function ExternalLink({
  href,
  children,
  ...props
}: ComponentProps<'a'>) {
  if (!isWebUrl(href)) return null
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
