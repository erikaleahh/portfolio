export interface PortfolioImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface PortfolioProfile {
  fullName: string | null
  role: string
  tagline: string
  location: { city: string | null; country: string }
  profileImage: PortfolioImage | null
  biography: { status: 'draft' | 'verified'; paragraphs: readonly string[] }
  skills: readonly string[]
  contact: {
    email: string | null
    githubUrl: string | null
    linkedinUrl: string | null
  }
}

export interface PortfolioProject {
  id: string
  status: 'placeholder' | 'verified'
  title: string
  description: string
  role?: string
  category?: string
  repositoryVisibility?: 'public' | 'private'
  technologies: readonly string[]
  image: PortfolioImage | null
  repositoryUrl: string | null
  liveUrl: string | null
}

export interface PortfolioCertificate {
  id: string
  title: string
  issuer: string
  category?: string
  /** ISO date: YYYY-MM-DD, YYYY-MM, or YYYY. */
  issuedOn: string
  expiresOn?: string | null
  credentialId?: string | null
  image: PortfolioImage | null
  /** Public HTTPS URL or a root-relative image/PDF path, never a local file-system path. */
  documentUrl: string | null
  verificationUrl: string | null
}
