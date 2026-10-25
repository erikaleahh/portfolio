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
    id: 'q1-project-02',
    status: 'placeholder',
    title: '[Q1 PROJECT 2 TITLE]',
    description: '[PROJECT DESCRIPTION — real project details pending]',
    technologies: ['React', 'Tailwind CSS', 'GSAP'],
    image: null,
    repositoryUrl: null,
    liveUrl: null,
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
