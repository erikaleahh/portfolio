import { Braces, Code2, GitBranch, Layers3, MoveUpRight } from 'lucide-react'
import { site, toolkitGroups } from '../data'
import { GitHubIcon } from './SocialIcons'

const skillIcons = {
  HTML5: Code2,
  CSS3: Braces,
  JavaScript: Braces,
  React: Layers3,
  'Tailwind CSS': Layers3,
  GSAP: MoveUpRight,
  Git: GitBranch,
  GitHub: GitHubIcon,
}

const brandLogos: Record<string, string> = {
  Figma: '/images/toolkit/figma.svg',
  Claude: '/images/toolkit/claude.svg',
  ChatGPT: '/images/toolkit/openai.svg',
}

export function Toolkit() {
  return (
    <section className="toolkit-section" aria-labelledby="toolkit-title">
        <div className="toolkit-layout page-container">
          <div className="about-capabilities" data-reveal>
            <h2 className="eyebrow">{site.about.capabilitiesLabel}</h2>
            <ol className="capability-list">
              {site.about.capabilities.map((capability, index) => (
                <li key={capability.title}>
                  <span className="capability-number" aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                    <span className="capability-evidence">{capability.evidence}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="skills-area" data-reveal>
            <h2 id="toolkit-title" className="eyebrow">{site.about.skillsLabel}</h2>
            {toolkitGroups.map((group) => (
              <div className="toolkit-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="toolkit-tools">
              {group.skills.map((skill) => {
                const Icon = skillIcons[skill as keyof typeof skillIcons] ?? Code2
                const logo = brandLogos[skill]
                return (
                  <li key={skill}>
                    {logo ? (
                      <span
                        className="skill-brand-logo"
                        style={{ maskImage: `url("${logo}")` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    )}
                    <span>{skill}</span>
                  </li>
                )
              })}
                </ul>
              </div>
            ))}
            <p className="toolkit-note">
              {site.about.toolkitNote}
            </p>
          </div>
        </div>
    </section>
  )
}
