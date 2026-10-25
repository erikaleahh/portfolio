import { ArrowDown, ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { useState } from 'react'
import { portfolio, site } from '../data'
import { SectionLink } from './SectionLink'
import { LanyardBadge } from './LanyardBadge'

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false)
  const location = [portfolio.location.city, portfolio.location.country]
    .filter(Boolean)
    .join(', ')
  return (
    <section
      id="home"
      tabIndex={-1}
      className="hero-section"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid page-container">
        <div className="hero-intro" data-hero-reveal>
          <span className="status-dot" aria-hidden="true" />
          <p>{site.hero.status}</p>
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow" data-hero-reveal>
            {portfolio.fullName ?? '[Your full name]'}{' '}
            <span className="hero-intro-rule" aria-hidden="true" />{' '}
            {portfolio.location.country}
          </p>
          <h1
            id="hero-title"
            className="hero-title"
            aria-label={site.hero.lines.join(' ')}
          >
            {site.hero.lines.map((line, index) => (
              <span className="hero-line-wrap" key={line}>
                <span
                  data-hero-line
                  className={
                    index === 1 ? 'hero-line accent-text' : 'hero-line'
                  }
                >
                  {line}
                  {index === 1 && (
                    <span className="hero-asterisk" aria-hidden="true">
                      ✳
                    </span>
                  )}
                </span>
              </span>
            ))}
          </h1>
          <div className="hero-description" data-hero-reveal>
            <ArrowDownRight
              size={28}
              className="text-accent"
              aria-hidden="true"
            />
            <p>{portfolio.tagline}</p>
          </div>
          <div className="hero-actions" data-hero-reveal>
            <SectionLink
              section="projects"
              className="button button-primary"
              data-hover
            >
              {site.hero.primaryCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </SectionLink>
            <SectionLink section="contact" className="text-link" data-hover>
              {site.hero.secondaryCta}
              <ArrowUpRight size={17} aria-hidden="true" />
            </SectionLink>
          </div>
        </div>

        <div
          className={`hero-visual ${portfolio.profileImage && !imageFailed ? 'hero-visual-lanyard' : ''}`}
          data-hero-visual
        >
          <div className="visual-corner visual-corner-tl" aria-hidden="true" />
          <div className="visual-corner visual-corner-br" aria-hidden="true" />
          {portfolio.profileImage && !imageFailed ? (
            <LanyardBadge
              image={portfolio.profileImage}
              onImageError={() => setImageFailed(true)}
            />
          ) : (
            <div className="orbital-art" aria-hidden="true">
              <div className="orbit-halo" />
              <div className="orbit-sphere">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="orbit-cross" />
              <span className="orbit-point" />
            </div>
          )}
          <div className="visual-label">
            <span className="mono-label">Between logic & imagination</span>
            <span className="visual-label-dot" aria-hidden="true" />
          </div>
          <span className="visual-axis" aria-hidden="true">
            01 — EXPLORING POSSIBILITIES
          </span>
        </div>

        <div className="hero-meta" data-hero-reveal>
          <p className="hero-role">{portfolio.role}</p>
          <p className="hero-location">
            <MapPin size={13} aria-hidden="true" />
            {location}
          </p>
          <SectionLink
            section="about"
            className="scroll-cue"
            aria-label="Scroll to About"
          >
            <span>Scroll to discover</span>
            <ArrowDown size={16} aria-hidden="true" />
          </SectionLink>
        </div>
      </div>
    </section>
  )
}
