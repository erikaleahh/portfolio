import { site } from '../data'

type BrandVariant = 'responsive' | 'wordmark' | 'monogram' | 'small'

export function BrandLogo({ variant = 'responsive', monochrome = false }: {
  variant?: BrandVariant
  monochrome?: boolean
}) {
  if (variant === 'responsive') {
    return (
      <span className="brand-responsive" aria-hidden="true">
        <span className="brand-desktop"><BrandLogo variant="wordmark" /></span>
        <span className="brand-mobile"><BrandLogo variant="monogram" /></span>
      </span>
    )
  }
  const src = site.brand[variant]
  return variant === 'wordmark' && !monochrome ? (
    <img className="brand-logo brand-logo-wordmark" src={src} width="360" height="80" alt="" aria-hidden="true" />
  ) : (
    <span className={`brand-logo brand-logo-mask brand-logo-${variant}`} style={{ maskImage: `url("${src}")` }} aria-hidden="true" />
  )
}
