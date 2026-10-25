import { ArrowUpRight, Download } from 'lucide-react'
import { portfolio } from '../data'

export function CvLink({ download = false }: { download?: boolean }) {
  const cv = portfolio.cv
  if (!cv) return null

  return (
    <a
      href={cv.url}
      className={download ? 'text-link contact-cv-link' : 'button button-cv'}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? cv.fileName : undefined}
    >
      {download ? <Download size={16} aria-hidden="true" /> : null}
      {download ? 'Download CV' : 'View CV'}
      {cv.isPlaceholder && <span className="cv-preview-label">Preview</span>}
      {!download && <ArrowUpRight size={17} aria-hidden="true" />}
      <span className="sr-only">
        {download ? ' (PDF)' : ' (PDF, opens in a new tab)'}
      </span>
    </a>
  )
}
