import type { PortfolioProfile } from './types'

export const toolkitGroups = [
  { title: 'Design & prototyping', skills: ['Figma', 'HTML5', 'CSS3', 'JavaScript'] },
  { title: 'Frontend & workflow', skills: ['React', 'Tailwind CSS', 'GSAP', 'Git', 'GitHub'] },
  { title: 'AI collaboration', skills: ['Claude', 'ChatGPT'] },
] as const

export const portfolio: PortfolioProfile = {
  fullName: 'Erika Leah Habaradas',
  role: 'Creative Developer / Frontend Developer',
  tagline: 'Crafting digital experiences through code and creativity.',
  location: { city: 'Digos City', country: 'Philippines' },
  profileImage: {
    src: '/images/erika-leah-habaradas.webp',
    alt: 'Portrait of Erika Leah Habaradas',
  },
  biography: {
    status: 'draft',
    paragraphs: [
      "I'm Erika, a creative frontend developer based in Digos City, Philippines. My work brings together Figma design, interactive storefront prototypes, and a close eye for how an interface looks and feels.",
      "From Sip Avenue and Reloved to frontend QA and social media management for RSVP, I work across design, implementation, and presentation. I'm continuing to grow in React and GSAP, with Claude and ChatGPT as collaborators in my design and development workflow.",
    ],
  },
  skills: toolkitGroups.flatMap((group) => [...group.skills]),
  // Replace this PDF with the final CV and set isPlaceholder to false.
  cv: {
    url: '/documents/erika-leah-habaradas-cv-placeholder.pdf',
    fileName: 'Erika-Leah-Habaradas-CV-Preview.pdf',
    isPlaceholder: true,
  },
  contact: {
    email: 'erikaleahabaradas@gmail.com',
    githubUrl: 'https://github.com/erikaleahh',
    linkedinUrl: null,
  },
}

export const portfolioRepositoryUrl = 'https://github.com/erikaleahh/portfolio'
