import { isWebUrl } from './links'

export function isCertificateUrl(
  value: string | null | undefined,
): value is string {
  if (!value || value !== value.trim()) return false
  if (
    [...value].some(
      (character) => character === '\\' || character.charCodeAt(0) < 32,
    )
  )
    return false
  return (value.startsWith('/') && !value.startsWith('//')) || isWebUrl(value)
}

/** Validate calendar dates without timezone shifts or Date's silent rollover. */
export function formatCertificateDate(
  value: string | null | undefined,
): string | null {
  if (!value || !/^\d{4}(-\d{2})?(-\d{2})?$/.test(value)) return null
  const parts = value.split('-').map(Number)
  const [year, month = 1, day = 1] = parts
  if (year < 1000 || month < 1 || month > 12 || day < 1 || day > 31) return null
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    ...(parts.length > 1 ? { month: 'short' as const } : {}),
    ...(parts.length > 2 ? { day: 'numeric' as const } : {}),
    timeZone: 'UTC',
  }).format(date)
}
