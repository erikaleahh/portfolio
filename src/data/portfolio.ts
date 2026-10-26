import type { PortfolioProfile } from './types'

export const toolkitGroups = [
  { title: 'Design & prototyping', skills: ['Figma', 'HTML5', 'CSS3', 'JavaScript'] },
  { title: 'Frontend & workflow', skills: ['React', 'Tailwind CSS', 'GSAP', 'Git', 'GitHub'] },
  { title: 'AI collaboration', skills: ['Claude', 'ChatGPT'] },
] as const

export const toolkitDetails: Record<string, string> = {
  Figma: 'Visual direction, interface layouts, and storefront concepts before the first line of code.',
  HTML5: 'Semantic page structures and design prototypes that developers can build on.',
  CSS3: 'Responsive layouts, considered spacing, and the small visual details that bring a design together.',
  JavaScript: 'Product filters, shopping-bag interfaces, and interactive prototype behavior.',
  React: 'Reusable components and a growing foundation for interactive frontend applications.',
  'Tailwind CSS': 'Utility-based styling for consistent, responsive interfaces.',
  GSAP: 'Entrance animations, scroll reveals, and refined interactions with reduced-motion support.',
  Git: 'Version control and incremental changes throughout the development process.',
  GitHub: 'A home for public project source code and development history.',
  Claude: 'AI collaboration for exploring ideas, implementation approaches, and reviewing work.',
  ChatGPT: 'AI assistance with design exploration, problem-solving, and development iteration.',
}

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
      "I bring thoughtful design and code together to create intuitive digital experiences, using tools like Claude and ChatGPT to explore ideas and support my workflow while continually refining my craft.",
    ],
  },
  skills: toolkitGroups.flatMap((group) => [...group.skills]),
  cv: {
    url: '/documents/erika-leah-habaradas-cv.pdf',
    fileName: 'Erika-Leah-Habaradas-CV.pdf',
    isPlaceholder: false,
  },
  contact: {
    email: 'erikaleahabaradas@gmail.com',
    githubUrl: 'https://github.com/erikaleahh',
    linkedinUrl: 'https://www.linkedin.com/in/erika-leah-habaradas-7a6202447',
  },
}

export const portfolioRepositoryUrl = 'https://github.com/erikaleahh/portfolio'
