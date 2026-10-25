import { ArrowUpRight } from 'lucide-react'
import { portfolio, site, type PortfolioImage } from '../data'

export function LanyardBadge({
  image,
  onImageError,
}: {
  image: PortfolioImage
  onImageError: () => void
}) {
  return (
    <div className="lanyard-stage" data-lanyard-stage>
      <div className="lanyard-rig" data-lanyard-swing>
        <svg
          className="lanyard-strap"
          viewBox="0 0 280 120"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M92 -16C75 19 83 56 140 110M188 -16C205 19 197 56 140 110"
            stroke="currentColor"
            strokeWidth="18"
          />
          <path
            d="M92 -16C75 19 83 56 140 110M188 -16C205 19 197 56 140 110"
            stroke="#f8e5db"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity=".5"
          />
        </svg>
        <span className="lanyard-clip" aria-hidden="true">
          <i />
        </span>
        <div className="lanyard-card">
          <button
            type="button"
            className="lanyard-interaction"
            data-lanyard-activate
            aria-label="Give Erika’s portfolio pass a swing"
            aria-describedby="lanyard-hint"
          />
          <div className="lanyard-slot" aria-hidden="true" />
          <div className="lanyard-card-top">
            <span className="lanyard-monogram" aria-hidden="true">
              {site.monogram}
            </span>
            <span>{site.hero.badgeLabel}</span>
            <span className="lanyard-card-dot" aria-hidden="true" />
          </div>
          <div className="lanyard-photo">
            <img
              src={image.src}
              alt={image.alt}
              width="1254"
              height="1254"
              fetchPriority="high"
              onError={onImageError}
            />
          </div>
          <div className="lanyard-identity">
            <p className="lanyard-name">{portfolio.fullName ?? 'Your name'}</p>
            <p className="lanyard-role">{portfolio.role}</p>
            <p className="lanyard-location">
              {[portfolio.location.city, portfolio.location.country]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
          <div className="lanyard-card-bottom">
            <span>{site.hero.badgeNote}</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </div>
        </div>
      </div>
      <span id="lanyard-hint" className="lanyard-hint">
        Click or tap to give it a swing
      </span>
    </div>
  )
}
