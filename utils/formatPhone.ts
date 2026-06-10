export const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`
  }
  return raw
}
