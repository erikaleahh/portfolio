import { Award, ArrowDownRight } from 'lucide-react'
import { certificates, site, type PortfolioCertificate } from '../data'
import { CertificateCard } from './CertificateCard'
import { SectionHeading } from './SectionHeading'

export function Certificates({
  items = certificates,
}: {
  items?: readonly PortfolioCertificate[]
}) {
  return (
    <section
      id="certificates"
      tabIndex={-1}
      className="certificates-section section-spacing"
      aria-labelledby="certificates-title"
    >
      <div className="page-container">
        <div className="certificates-heading">
          <SectionHeading
            number="03"
            label={site.certificates.label}
            title={site.certificates.title}
            id="certificates-title"
          />
          <p className="certificates-intro" data-reveal>
            {site.certificates.description}
          </p>
        </div>
        {items.length > 0 ? (
          <div className="certificates-grid">
            {items.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        ) : (
          <div className="certificates-empty" data-reveal>
            <span className="certificate-empty-mark">
              <Award size={36} strokeWidth={1.2} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">Room to grow</p>
              <h3>{site.certificates.emptyTitle}</h3>
              <p>{site.certificates.emptyDescription}</p>
            </div>
            <ArrowDownRight
              size={36}
              strokeWidth={1.2}
              className="certificate-empty-arrow"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </section>
  )
}
