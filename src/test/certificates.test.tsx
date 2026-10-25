import { describe, expect, it } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import axe from 'axe-core'
import App from '../App'
import { Certificates } from '../components/Certificates'
import { CertificateCard } from '../components/CertificateCard'
import type { PortfolioCertificate } from '../data'
import { formatCertificateDate, isCertificateUrl } from '../utils/certificates'

// Test fixtures only. These are never included in the real portfolio data.
const certificate: PortfolioCertificate = {
  id: 'test-certificate',
  title: 'Test Web Development Certificate',
  issuer: 'Example Issuer',
  issuedOn: '2025-06-15',
  expiresOn: '2028-06',
  credentialId: 'TEST-001',
  image: { src: '/certificates/test.webp', alt: 'Test certificate preview' },
  documentUrl: '/certificates/test.pdf',
  verificationUrl: 'https://example.com/verify/test',
}

describe('Certificate showcase', () => {
  it('shows a clear empty collection without invented certificates or links', () => {
    const { container } = render(<Certificates items={[]} />)
    expect(
      screen.getByRole('heading', { name: 'Certificates coming soon.' }),
    ).toBeTruthy()
    expect(screen.queryAllByRole('article')).toHaveLength(0)
    expect(container.querySelectorAll('a')).toHaveLength(0)
  })

  it('renders earned credential details and safe view/verification actions when provided', async () => {
    const { container } = render(<Certificates items={[certificate]} />)
    expect(
      screen.getByRole('heading', { name: certificate.title }),
    ).toBeTruthy()
    expect(screen.getByText(certificate.issuer)).toBeTruthy()
    expect(screen.getByText('Jun 15, 2025').getAttribute('datetime')).toBe(
      '2025-06-15',
    )
    expect(screen.getByText('Jun 2028')).toBeTruthy()
    expect(screen.getByText('TEST-001')).toBeTruthy()
    expect(
      screen
        .getByRole('img', { name: 'Test certificate preview' })
        .getAttribute('loading'),
    ).toBe('lazy')
    const view = screen.getByRole('link', { name: /View certificate/ })
    expect(view.getAttribute('href')).toBe('/certificates/test.pdf')
    expect(view.getAttribute('target')).toBe('_blank')
    expect(view.getAttribute('rel')).toBe('noopener noreferrer')
    expect(
      screen
        .getByRole('link', { name: /Verify credential/ })
        .getAttribute('href'),
    ).toBe(certificate.verificationUrl)
    expect(
      (
        await axe.run(container, {
          rules: { 'color-contrast': { enabled: false } },
        })
      ).violations.map((violation) => violation.id),
    ).toEqual([])
  })

  it('omits missing/unsafe links and invalid dates, and falls back if the preview fails', () => {
    render(
      <CertificateCard
        certificate={{
          ...certificate,
          documentUrl: 'javascript:alert(1)',
          verificationUrl: '[VERIFICATION URL]',
          issuedOn: '2025-02-31',
          expiresOn: null,
        }}
      />,
    )
    // The image itself is a valid view target until loading fails.
    fireEvent.error(screen.getByRole('img'))
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('Preview unavailable')).toBeTruthy()
    expect(screen.getByText('Credential links not provided')).toBeTruthy()
    expect(screen.getByText('Date to be added')).toBeTruthy()
    expect(screen.queryByText('Expires')).toBeNull()
  })

  it('supports PDF-only certificates without pretending there is a screenshot', () => {
    render(
      <CertificateCard
        certificate={{ ...certificate, image: null, verificationUrl: null }}
      />,
    )
    expect(screen.getByText('Certificate preview not added')).toBeTruthy()
    expect(screen.getByRole('link', { name: /View certificate/ })).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Verify credential/ })).toBeNull()
  })
})

describe('Certificate navigation', () => {
  it('lands on Certificates through a direct hash', () => {
    render(
      <MemoryRouter initialEntries={['/#certificates']}>
        <App />
      </MemoryRouter>,
    )
    expect(document.activeElement?.id).toBe('certificates')
  })

  it('navigates from the 404 page via desktop navigation', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/missing']}>
        <App />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('link', { name: 'Certificates' }))
    await waitFor(() => expect(document.activeElement?.id).toBe('certificates'))
  })

  it('closes the mobile menu and focuses Certificates after selecting it', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const dialog = screen.getByRole('dialog') as HTMLDialogElement
    await user.click(within(dialog).getByRole('link', { name: /Certificates/ }))
    await waitFor(() => expect(dialog.open).toBe(false))
    expect(document.activeElement?.id).toBe('certificates')
  })
})

describe('Certificate content utilities', () => {
  it('groups actual learning paths with logical heading levels', () => {
    render(<Certificates />)
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Cybersecurity & networking',
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Entrepreneurship & career development',
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Cyber Threat Management',
      }),
    ).toBeTruthy()
    expect(screen.getByText('5 certificates')).toBeTruthy()
    expect(screen.getByText('1 certificate')).toBeTruthy()
    expect(screen.queryByText('Certificates coming soon.')).toBeNull()
  })
  it('formats real calendar dates without rollover or timezone changes', () => {
    expect(formatCertificateDate('2024-02-29')).toBe('Feb 29, 2024')
    expect(formatCertificateDate('2025-02-29')).toBeNull()
    expect(formatCertificateDate('2025-13')).toBeNull()
    expect(formatCertificateDate('2025-06')).toBe('Jun 2025')
    expect(formatCertificateDate('2025')).toBe('2025')
    expect(formatCertificateDate('not-a-date')).toBeNull()
  })

  it('allows public documents while rejecting unsafe schemes and network-relative paths', () => {
    for (const url of [
      '/certificates/file.pdf',
      'https://example.com/certificate.png',
    ])
      expect(isCertificateUrl(url)).toBe(true)
    for (const url of [
      null,
      '',
      '//other.example/file.pdf',
      '/\\other.example/file.pdf',
      'file:///C:/cert.pdf',
      'javascript:alert(1)',
      'data:application/pdf,test',
      '[IMAGE PATH]',
    ])
      expect(isCertificateUrl(url)).toBe(false)
  })
})
