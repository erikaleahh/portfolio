import { ArrowUpRight } from 'lucide-react'
import { portfolio, site } from '../data'
import { SectionHeading } from './SectionHeading'
import { SectionLink } from './SectionLink'
import { CvLink } from './CvLink'
import { Toolkit } from './Toolkit'

export function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="about-section section-spacing"
      aria-labelledby="about-title"
    >
      <div className="page-container">
        <div className="about-top">
          <SectionHeading
            number="01"
            label={site.about.label}
            title={site.about.title}
            id="about-title"
          />
          <div className="about-biography" data-reveal>
            {portfolio.biography.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="about-actions">
              <SectionLink section="projects" className="text-link about-work-link">
                {site.about.projectsCta}<ArrowUpRight size={17} aria-hidden="true" />
              </SectionLink>
              <CvLink />
            </div>
          </div>
        </div>
        <Toolkit />
      </div>
    </section>
  )
}
