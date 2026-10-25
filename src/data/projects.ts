import type { PortfolioProject } from './types'

export const projects: readonly PortfolioProject[] = [
  {
    id: 'rsvp',
    status: 'verified',
    title: 'RSVP — Digital Invitations',
    description:
      'A digital invitation platform for weddings and debuts, with customizable designs, celebration details, and private draft previews.',
    role: 'Frontend QA & SMM',
    category: 'Digital invitations',
    repositoryVisibility: 'private',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    image: {
      src: '/images/projects/rsvp-homepage.webp',
      alt: 'RSVP homepage with a forest-green invitation design, gold accents, and the heading A beautiful invitation. A simple yes.',
      width: 1265,
      height: 712,
    },
    repositoryUrl: null,
    liveUrl: 'https://rsvpa.netlify.app/',
  },
  {
    id: 'sip-avenue',
    status: 'verified',
    title: 'Sip Avenue — Coffee Shop Prototype',
    description:
      'An e-commerce prototype for local coffee shops, with product browsing, filtering, and a shopping-bag interface. Designed as a foundation for a possible future Shopify storefront.',
    category: 'E-commerce prototype',
    technologies: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    image: {
      src: '/images/projects/sip-avenue-homepage.webp',
      alt: 'Sip Avenue coffee shop prototype homepage with a cream storefront, the heading Good coffee. Better days., and a coffee photograph.',
      width: 1265,
      height: 712,
    },
    repositoryUrl: null,
    liveUrl: 'https://sip-zeta-eight.vercel.app/',
  },
  {
    id: 'q1-project-03',
    status: 'placeholder',
    title: '[Q1 PROJECT 3 TITLE]',
    description: '[PROJECT DESCRIPTION — real project details pending]',
    technologies: ['React', 'JavaScript', 'GSAP'],
    image: null,
    repositoryUrl: null,
    liveUrl: null,
  },
]
