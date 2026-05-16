/**
 * Shared formatters for SkyGraph Vue showcases.
 * Mirrors `examples/showcases/src/showcases/_shared/formatters.ts`.
 */

export function money(n: number, opts: { compact?: boolean; sign?: boolean } = {}): string {
  if (!Number.isFinite(n)) return '—'
  const sign = opts.sign && n > 0 ? '+' : ''
  if (opts.compact) {
    if (Math.abs(n) >= 1_000_000) return `${sign}$${(n / 1_000_000).toFixed(1)}M`
    if (Math.abs(n) >= 1_000) return `${sign}$${(n / 1_000).toFixed(1)}k`
  }
  return `${sign}$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}

export function num(n: number, opts: { compact?: boolean } = {}): string {
  if (!Number.isFinite(n)) return '—'
  if (opts.compact) {
    if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  }
  return n.toLocaleString()
}

export function percent(n: number, fractionDigits = 1): string {
  if (!Number.isFinite(n)) return '—'
  return `${n.toFixed(fractionDigits)}%`
}

export function bytes(b: number): string {
  if (!Number.isFinite(b) || b <= 0) return '—'
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)} MB`
  return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`
}

export function duration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '—'
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ${s % 60}s`
  const h = Math.floor(m / 60)
  return `${h}h ${m % 60}m`
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return '—'
  const diff = Date.now() - d.getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

export function shortDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return '—'
  return d.toISOString().slice(0, 10)
}

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function colorFromString(s: string, sat = 60, lightness = 50): string {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
  return `hsl(${h}, ${sat}%, ${lightness}%)`
}
