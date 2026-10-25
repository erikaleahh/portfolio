import { expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { certificates } from '../src/data/certificates'
import { formatCertificateDate } from '../src/utils/certificates'

it('serves all six supplied certificates with real local PDFs and optimized previews', () => {
  expect(certificates).toHaveLength(6)
  expect(new Set(certificates.map(({ id }) => id)).size).toBe(6)
  for (const certificate of certificates) {
    const pdf = readFileSync(
      resolve(process.cwd(), 'public', certificate.documentUrl!.slice(1)),
    )
    const preview = readFileSync(
      resolve(process.cwd(), 'public', certificate.image!.src.slice(1)),
    )
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-')
    expect(preview.subarray(0, 4).toString()).toBe('RIFF')
    expect(preview.subarray(8, 12).toString()).toBe('WEBP')
    expect(formatCertificateDate(certificate.issuedOn)).not.toBeNull()
  }
})
