// Presentation copy lives here; personal details and projects live alongside it.
export const site = {
  monogram: 'e.',
  hero: {
    eyebrow: 'A little curiosity. A lot of possibility.',
    taglines: [
      ['Design that', 'converts.'],
      ['Code that', 'connects.'],
    ],
    status: 'Always learning. Always creating.',
    primaryCta: 'Explore my work',
    secondaryCta: 'Get in touch',
    badgeLabel: 'Portfolio pass',
    badgeNote: 'Made of curiosity.',
  },
  about: {
    label: 'A little about me',
    title: 'A designer’s eye. A developer’s mindset.',
    capabilitiesLabel: 'How I contribute',
    capabilities: [
      { title: 'Design with intent', description: 'Figma concepts and storefront layouts that give a brand a clear visual direction.', evidence: 'Sip Avenue / Reloved' },
      { title: 'Make it tangible', description: 'HTML, CSS, and JavaScript prototypes that help developers turn a design into a custom storefront.', evidence: 'Design → prototype → handoff' },
      { title: 'Refine the experience', description: 'Frontend QA and social media support, bringing attention to both the interface and its presentation.', evidence: 'RSVP · Frontend QA & SMM' },
    ],
    projectsCta: 'See it in my work',
    skillsLabel: 'My creative toolkit',
    beauty: {
      routineIntro: 'A little prep. A little craft. A considered finish.',
      steps: ['Prep', 'Shape', 'Polish'],
      compactLabel: 'The creative edit',
      compactClosed: 'Open my toolkit',
      compactOpen: 'Close my toolkit',
      compactHint: 'A palette of tools, chosen with intention.',
      swatchHint: 'Choose a shade to explore a tool.',
    },
  },
  projects: {
    label: 'Selected work',
    title: 'Ideas, made interactive.',
    description:
      'An evolving collection of experiments in frontend development, interaction, and motion.',
    pendingNote:
      'A growing collection. Some project details and previews are still being added. Private source code is not shared.',
  },
  certificates: {
    label: 'Continued learning',
    title: 'Growing beyond the code.',
    description:
      'From cybersecurity and networking to entrepreneurial thinking—credentials that reflect the different ways I keep learning.',
    emptyTitle: 'Certificates coming soon.',
    emptyDescription:
      'This collection is waiting for my actual certificates. Issuers, dates, and available credential links will appear here once added.',
  },
  contact: {
    label: 'Make a connection',
    title: ['Have an idea?', "Let's make it real."],
    description:
      'A new perspective, an interesting project, or just a hello. Every good collaboration starts with a conversation.',
  },
  footer: 'Designed & developed with creativity and code.',
} as const
