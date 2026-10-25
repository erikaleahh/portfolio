import { Award, ArrowDownRight } from 'lucide-react'
import { certificates, site, type PortfolioCertificate } from '../data'
import { CertificateCard } from './CertificateCard'
import { SectionHeading } from './SectionHeading'

export function Certificates({
  items = certificates,
}: {
  items?: readonly PortfolioCertificate[]
}) {
  const groups = new Map<string, PortfolioCertificate[]>()
  for (const certificate of items) {
    const category = certificate.category ?? ''
    const group = groups.get(category) ?? []
    group.push(certificate)
    groups.set(category, group)
  }
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
          <div className="certificate-collections">
            {[...groups].map(([category, entries]) => (
              <div key={category} className="certificate-collection">
                {category && (
                  <div className="certificate-group-heading" data-reveal>
                    <h3>{category}</h3>
                    <span>
                      {entries.length}{' '}
                      {entries.length === 1 ? 'certificate' : 'certificates'}
                    </span>
                  </div>
                )}
                <div className="certificates-grid">
                  {entries.map((certificate) => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                      headingLevel={category ? 'h4' : 'h3'}
                    />
                  ))}
                </div>
              </div>
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
