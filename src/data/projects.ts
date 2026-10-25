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
    repositoryVisibility: 'public',
    repositoryUrl: 'https://github.com/erikaleahh/sip',
    liveUrl: 'https://sip-zeta-eight.vercel.app/',
  },
  {
    id: 'reloved',
    status: 'verified',
    title: 'Reloved — Fashion Storefront Prototype',
    description:
      'An elegant pre-loved fashion and beauty storefront, designed in Figma and prototyped in HTML, CSS, and JavaScript as a developer handoff for conversion into a custom Shopify Liquid theme.',
    role: 'Storefront Design & Frontend Prototyping',
    category: 'Storefront design handoff',
    technologies: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    image: {
      src: '/images/projects/reloved-homepage.webp',
      alt: 'Reloved fashion storefront prototype with an editorial photograph, cream layout, and the heading Loved before. Loved again.',
      width: 1265,
      height: 712,
    },
    repositoryVisibility: 'public',
    repositoryUrl: 'https://github.com/erikaleahh/reloved',
    liveUrl: 'https://reloved-six.vercel.app/',
  },
]
