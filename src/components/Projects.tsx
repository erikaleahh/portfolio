import { ArrowUpRight } from 'lucide-react'
import { portfolio, projects, site } from '../data'
import { ExternalLink } from './ExternalLink'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const hasPending = projects.some(
    (project) => project.status === 'placeholder',
  )
  return (
    <section
      id="projects"
      tabIndex={-1}
      className="projects-section section-spacing"
      aria-labelledby="projects-title"
    >
      <div className="page-container">
        <div className="projects-heading">
          <SectionHeading
            number="02"
            label={site.projects.label}
            title={site.projects.title}
            id="projects-title"
          />
          <div className="projects-intro" data-reveal>
            <p>{site.projects.description}</p>
            <ExternalLink
              href={portfolio.contact.githubUrl ?? undefined}
              className="text-link"
            >
              More on GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
          </div>
        </div>
        {hasPending && (
          <p className="work-note" data-reveal>
            <span className="status-dot" aria-hidden="true" />
            {site.projects.pendingNote}
          </p>
        )}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
