import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { portfolio, site } from '../data'
import { ExternalLink } from './ExternalLink'
import { isWebUrl } from '../utils/links'
import { CvLink } from './CvLink'

export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const email = portfolio.contact.email?.trim()
  const hasEmail = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copyEmail = async () => {
    if (!hasEmail) return
    try {
      await navigator.clipboard.writeText(email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), 3000)
  }
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="page-container contact-content">
        <p className="eyebrow" data-reveal>
          <span className="section-number">04</span>
          {site.contact.label}
        </p>
        <div className="contact-heading-row" data-reveal>
          <h2 id="contact-title">
            {site.contact.title[0]}
            <br />
            <span>{site.contact.title[1]}</span>
          </h2>
          <span className="contact-symbol" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="contact-bottom" data-reveal>
          <div className="contact-description">
            <p>{site.contact.description}</p>
            {hasEmail ? (
              <div>
                <a className="contact-email-address" href={`mailto:${email}`}>
                  {email}
                </a>
                <div className="email-actions">
                  <a
                    href={`mailto:${email}`}
                    className="button button-dark"
                    data-hover
                  >
                    Send me an email
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    className="copy-email"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                  >
                    {copyState === 'copied' ? (
                      <Check size={18} aria-hidden="true" />
                    ) : (
                      <Copy size={18} aria-hidden="true" />
                    )}
                  </button>
                  <span className="sr-only" role="status">
                    {copyState === 'copied'
                      ? 'Email copied'
                      : copyState === 'failed'
                        ? 'Copy failed. Use the email link instead.'
                        : ''}
                  </span>
                </div>
              </div>
            ) : (
              <p className="email-pending">
                <Mail size={17} aria-hidden="true" />
                Public email coming soon
              </p>
            )}
            <CvLink download />
          </div>
          <div className="contact-socials">
            <span className="mono-label">Find me elsewhere</span>
            <ExternalLink href={portfolio.contact.githubUrl ?? undefined}>
              GitHub
              <ArrowUpRight size={20} aria-hidden="true" />
            </ExternalLink>
            {isWebUrl(portfolio.contact.linkedinUrl) ? (
              <ExternalLink href={portfolio.contact.linkedinUrl}>
                LinkedIn
                <ArrowUpRight size={20} aria-hidden="true" />
              </ExternalLink>
            ) : (
              <span className="social-pending">LinkedIn — to be added</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
