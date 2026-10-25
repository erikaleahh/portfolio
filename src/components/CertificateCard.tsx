import { useState } from 'react'
import { ArrowUpRight, Award, FileText, ShieldCheck } from 'lucide-react'
import type { PortfolioCertificate } from '../data'
import { ExternalLink } from './ExternalLink'
import { isWebUrl } from '../utils/links'
import { formatCertificateDate, isCertificateUrl } from '../utils/certificates'

export function CertificateCard({
  certificate,
  headingLevel = 'h3',
}: {
  certificate: PortfolioCertificate
  headingLevel?: 'h3' | 'h4'
}) {
  const Heading = headingLevel
  const [failedImage, setFailedImage] = useState(false)
  const issued = formatCertificateDate(certificate.issuedOn)
  const expires = formatCertificateDate(certificate.expiresOn)
  const documentUrl = isCertificateUrl(certificate.documentUrl)
    ? certificate.documentUrl
    : !failedImage && isCertificateUrl(certificate.image?.src)
      ? certificate.image.src
      : null
  const canVerify = isWebUrl(certificate.verificationUrl)

  return (
    <article
      className="certificate-card"
      aria-labelledby={`${certificate.id}-title`}
      data-reveal
    >
      <div className="certificate-preview">
        {certificate.image &&
        isCertificateUrl(certificate.image.src) &&
        !failedImage ? (
          <img
            src={certificate.image.src}
            alt={certificate.image.alt}
            width="1200"
            height="850"
            loading="lazy"
            decoding="async"
            onError={() => setFailedImage(true)}
          />
        ) : (
          <div className="certificate-preview-fallback">
            <Award size={36} strokeWidth={1.2} aria-hidden="true" />
            <span>
              {failedImage
                ? 'Preview unavailable'
                : 'Certificate preview not added'}
            </span>
          </div>
        )}
      </div>
      <div className="certificate-details">
        <p className="certificate-issuer">{certificate.issuer}</p>
        <Heading id={`${certificate.id}-title`} className="certificate-title">
          {certificate.title}
        </Heading>
        <dl className="certificate-meta">
          <div>
            <dt>Issued</dt>
            <dd>
              {issued ? (
                <time dateTime={certificate.issuedOn}>{issued}</time>
              ) : (
                'Date to be added'
              )}
            </dd>
          </div>
          {expires && (
            <div>
              <dt>Expires</dt>
              <dd>
                <time dateTime={certificate.expiresOn!}>{expires}</time>
              </dd>
            </div>
          )}
          {certificate.credentialId && (
            <div className="credential-id">
              <dt>Credential ID</dt>
              <dd>{certificate.credentialId}</dd>
            </div>
          )}
        </dl>
        <div className="certificate-actions">
          {documentUrl && (
            <a
              href={documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-link"
            >
              <FileText size={15} aria-hidden="true" />
              View certificate
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {canVerify && (
            <ExternalLink
              href={certificate.verificationUrl!}
              className="certificate-link"
            >
              <ShieldCheck size={15} aria-hidden="true" />
              Verify credential
              <ArrowUpRight size={14} aria-hidden="true" />
            </ExternalLink>
          )}
          {!documentUrl && !canVerify && (
            <p className="certificate-link-pending">
              Credential links not provided
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
