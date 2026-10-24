export interface PortfolioImage {
  src: string
  alt: string
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
  technologies: readonly string[]
  image: PortfolioImage | null
  repositoryUrl: string | null
  liveUrl: string | null
}
