import type { PortfolioProfile } from './types'

export const portfolio: PortfolioProfile = {
  fullName: 'Erika Leah Habaradas',
  role: 'Creative Developer / Frontend Developer',
  tagline: 'Crafting digital experiences through code and creativity.',
  location: { city: 'Digos City', country: 'Philippines' },
  profileImage: null,
  biography: {
    status: 'draft',
    paragraphs: [
      "I'm an aspiring web developer based in the Philippines with a passion for creating functional, visually engaging, and user-friendly digital experiences. I enjoy combining thoughtful design with modern web technologies to transform creative ideas into interactive applications.",
      "Currently, I'm expanding my skills in React, JavaScript, frontend development. I continuously explore new tools and techniques to improve my development workflow, strengthen my problem-solving abilities, and build meaningful projects.",
    ],
  },
  skills: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'Tailwind CSS',
    'GSAP',
    'Git',
    'GitHub',
  ],
  contact: {
    email: 'erikahabaradas@g.cjc.edu.ph',
    githubUrl: 'https://github.com/erikaleahh',
    linkedinUrl: null,
  },
}

export const portfolioRepositoryUrl = 'https://github.com/erikaleahh/portfolio'
