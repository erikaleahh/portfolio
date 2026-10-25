import { ArrowUpRight, Download } from 'lucide-react'
import { portfolio } from '../data'

export function CvLink({ download = false }: { download?: boolean }) {
  const cv = portfolio.cv
  if (!cv) return null

  return (
    <a
      href={cv.url}
      className={`cv-link ${download ? 'contact-cv-link cv-link-download' : ''}`}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? cv.fileName : undefined}
    >
      <span className="cv-link-title">{download ? 'Download CV' : 'View CV'}</span>
      {cv.isPlaceholder && <span className="cv-preview-label">Preview</span>}
      {download ? <Download className="cv-link-arrow" size={17} aria-hidden="true" /> : <ArrowUpRight className="cv-link-arrow" size={18} aria-hidden="true" />}
      <span className="sr-only">
        {download ? ' (PDF)' : ' (PDF, opens in a new tab)'}
      </span>
    </a>
  )
}
