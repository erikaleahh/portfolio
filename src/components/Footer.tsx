import { ArrowUp } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'
import { portfolio, site } from '../data'
import { ExternalLink } from './ExternalLink'
import { SectionLink } from './SectionLink'
import { BrandLogo } from './BrandLogo'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <SectionLink
            section="home"
            className="brand"
            aria-label="Back to home"
          >
            <BrandLogo variant="wordmark" />
          </SectionLink>
          <p>{site.footer}</p>
          <SectionLink section="home" className="back-to-top">
            Back to top
            <ArrowUp size={16} aria-hidden="true" />
          </SectionLink>
        </div>
        <div className="footer-bottom">
          <p>
            © {currentYear} {portfolio.fullName ?? 'Portfolio'}
          </p>
          <p>
            From {portfolio.location.city ?? portfolio.location.country}, with
            care.
          </p>
          <div className="footer-socials">
            <ExternalLink
              href={portfolio.contact.githubUrl ?? undefined}
              aria-label="GitHub profile"
            >
              <GitHubIcon />
            </ExternalLink>
            <ExternalLink
              href={portfolio.contact.linkedinUrl ?? undefined}
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
            </ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
