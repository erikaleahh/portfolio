import type { PortfolioCertificate } from './types'

// Details transcribed from the user's original certificates. Newest first within each category.
// Original PDFs and optimized previews are served locally; no verification URLs are invented.
export const certificates: readonly PortfolioCertificate[] = [
  {
    id: 'cyber-threat-management',
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy · DICT–ITU DTC Initiative',
    category: 'Cybersecurity & networking',
    issuedOn: '2026-06-05',
    credentialId: '1e22eae3-8c5c-4a01-a06e-a8752b7e6c87',
    image: {
      src: '/certificates/cyber-threat-management.webp',
      alt: 'Cyber Threat Management certificate awarded to Erika Leah Habaradas',
    },
    documentUrl: '/certificates/cyber-threat-management.pdf',
    verificationUrl: null,
  },
  {
    id: 'endpoint-security',
    title: 'Endpoint Security',
    issuer: 'Cisco Networking Academy · DICT–ITU DTC Initiative',
    category: 'Cybersecurity & networking',
    issuedOn: '2026-06-05',
    credentialId: 'b40a0a38-80c4-4900-99f1-39db5de6601a',
    image: {
      src: '/certificates/endpoint-security.webp',
      alt: 'Endpoint Security certificate awarded to Erika Leah Habaradas',
    },
    documentUrl: '/certificates/endpoint-security.pdf',
    verificationUrl: null,
  },
  {
    id: 'networking-devices-and-initial-configuration',
    title: 'Networking Devices and Initial Configuration',
    issuer: 'Cisco Networking Academy · DICT–ITU DTC Initiative',
    category: 'Cybersecurity & networking',
    issuedOn: '2026-06-04',
    credentialId: '3efda42a-5b03-4c91-8260-0d7ccc006255',
    image: {
      src: '/certificates/networking-devices-and-initial-configuration.webp',
      alt: 'Networking Devices and Initial Configuration certificate awarded to Erika Leah Habaradas',
    },
    documentUrl:
      '/certificates/networking-devices-and-initial-configuration.pdf',
    verificationUrl: null,
  },
  {
    id: 'network-defense',
    title: 'Network Defense',
    issuer: 'Cisco Networking Academy · DICT–ITU DTC Initiative',
    category: 'Cybersecurity & networking',
    issuedOn: '2026-05-28',
    credentialId: 'd7cd639a-f2c3-4d4d-9e71-aba200972b34',
    image: {
      src: '/certificates/network-defense.webp',
      alt: 'Network Defense certificate awarded to Erika Leah Habaradas',
    },
    documentUrl: '/certificates/network-defense.pdf',
    verificationUrl: null,
  },
  {
    id: 'introduction-to-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy · DICT–ITU DTC Initiative',
    category: 'Cybersecurity & networking',
    issuedOn: '2026-05-16',
    credentialId: 'e227e023-2498-410e-bdc5-032edb7cf94e',
    image: {
      src: '/certificates/introduction-to-cybersecurity.webp',
      alt: 'Introduction to Cybersecurity certificate awarded to Erika Leah Habaradas',
    },
    documentUrl: '/certificates/introduction-to-cybersecurity.pdf',
    verificationUrl: null,
  },
  {
    id: 'wadhwani-ignite-lite',
    title: 'Ignite Lite – Philippines',
    issuer: 'Wadhwani Foundation',
    category: 'Entrepreneurship & career development',
    issuedOn: '2026-07-10',
    image: {
      src: '/certificates/wadhwani-ignite-lite.webp',
      alt: 'Ignite Lite Philippines certificate awarded to Erika Leah Habaradas by Wadhwani Foundation',
    },
    documentUrl: '/certificates/wadhwani-ignite-lite.pdf',
    verificationUrl: null,
  },
]
