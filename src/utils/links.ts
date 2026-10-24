export function isWebUrl(value: string | null | undefined): value is string {
  if (!value) return false
  try {
    return ['https:', 'http:'].includes(new URL(value).protocol)
  } catch {
    return false
  }
}
