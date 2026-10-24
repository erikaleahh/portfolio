import { Braces, Code2, GitBranch, Layers3, MoveUpRight } from 'lucide-react'
import { portfolio, site } from '../data'
import { SectionHeading } from './SectionHeading'

const skillIcons = [
  Code2,
  Braces,
  Braces,
  Layers3,
  Layers3,
  MoveUpRight,
  GitBranch,
  GitBranch,
]

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
            {portfolio.biography.status === 'draft' && (
              <span className="draft-label">
                Biography draft · still finding the right words
              </span>
            )}
          </div>
        </div>
        <div className="about-bottom">
          <div className="about-note" data-reveal>
            <span className="large-asterisk" aria-hidden="true">
              ✳
            </span>
            <p>{site.about.note}</p>
            <span className="mono-label">Curiosity / Craft / Continuity</span>
          </div>
          <div className="skills-area" data-reveal>
            <p className="eyebrow">{site.about.skillsLabel}</p>
            <ul className="skills-grid">
              {portfolio.skills.map((skill, index) => {
                const Icon = skillIcons[index % skillIcons.length]
                return (
                  <li key={skill}>
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    <span>{skill}</span>
                    <span className="skill-dot" aria-hidden="true" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
