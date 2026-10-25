import { useState } from 'react'
import { ArrowUpRight, Code2, Image, LockKeyhole } from 'lucide-react'
import type { PortfolioProject } from '../data'
import { ExternalLink } from './ExternalLink'
import { isWebUrl } from '../utils/links'

export function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject
  index: number
}) {
  const [failedImage, setFailedImage] = useState(false)
  const pending = project.status === 'placeholder'
  const number = String(index + 1).padStart(2, '0')
  return (
    <article
      className={`project-card project-card-${index + 1}`}
      aria-labelledby={`${project.id}-title`}
      data-project
    >
      <div
        className="project-preview"
        style={
          project.image?.width && project.image?.height
            ? {
                aspectRatio: `${project.image.width} / ${project.image.height}`,
              }
            : undefined
        }
      >
        {project.image && !failedImage ? (
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width ?? 1200}
            height={project.image.height ?? 800}
            loading="lazy"
            decoding="async"
            onError={() => setFailedImage(true)}
          />
        ) : (
          <div className="project-placeholder">
            <div className="preview-grid" aria-hidden="true" />
            <span className="preview-coordinate" aria-hidden="true">
              PROJECT / {number}
            </span>
            <div className="preview-center">
              <Image size={28} strokeWidth={1} aria-hidden="true" />
              <span>Preview to come</span>
            </div>
            <span className="preview-number" aria-hidden="true">
              {number}
            </span>
            <span className="preview-caption">
              {pending
                ? 'Q1 project · awaiting real content'
                : project.image
                  ? 'Project image unavailable'
                  : 'Project screenshot to be added'}
            </span>
          </div>
        )}
        <span className="project-category">
          {pending ? 'In the making' : (project.category ?? 'Featured project')}
        </span>
      </div>
      <div className="project-info">
        <div className="project-title-row">
          <span className="project-number">/{number}</span>
          <h3 id={`${project.id}-title`}>
            {pending ? `Q1 Project ${number}` : project.title}
          </h3>
          <ArrowUpRight
            className="project-heading-arrow"
            size={25}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <p className="project-description">
          {pending
            ? 'Real project details, screenshots, and links will be added here. This is a development placeholder.'
            : project.description}
        </p>
        {project.role && (
          <p className="project-role">
            <span>My role</span>
            {project.role}
          </p>
        )}
        {project.technologies.length > 0 && (
          <ul className="tech-tags" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}
        <div className="project-links">
          {project.repositoryVisibility === 'private' ? (
            <span className="unavailable-link private-source">
              <LockKeyhole size={13} aria-hidden="true" />
              Private source
            </span>
          ) : isWebUrl(project.repositoryUrl) ? (
            <ExternalLink href={project.repositoryUrl} className="project-link">
              <Code2 size={15} aria-hidden="true" />
              Source code
              <ArrowUpRight size={14} aria-hidden="true" />
            </ExternalLink>
          ) : (
            <span className="unavailable-link">Source pending</span>
          )}
          {isWebUrl(project.liveUrl) ? (
            <ExternalLink href={project.liveUrl} className="project-link">
              Live demo
              <ArrowUpRight size={14} aria-hidden="true" />
            </ExternalLink>
          ) : (
            <span className="unavailable-link">Demo pending</span>
          )}
        </div>
      </div>
    </article>
  )
}
