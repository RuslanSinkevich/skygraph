import { SHOWCASE_METAS } from './showcaseMeta'

const KEYS = new Set(SHOWCASE_METAS.map((m) => m.key))

/** Supports `#/crm` (legacy) and `#/showcases/crm` (demo-embedded). */
export function parseShowcaseHashRoute(
  raw: string,
): { kind: 'hub' } | { kind: 'detail'; key: string } {
  const h = raw.replace(/^#\/?/, '').replace(/^\//, '')
  if (!h || h === 'showcases') return { kind: 'hub' }
  if (h.startsWith('showcases/')) {
    const key = h.slice('showcases/'.length)
    if (KEYS.has(key)) return { kind: 'detail', key }
    return { kind: 'hub' }
  }
  if (KEYS.has(h)) return { kind: 'detail', key: h }
  return { kind: 'hub' }
}

export function showcaseDetailHash(key: string, mode: 'standalone' | 'demo'): string {
  if (mode === 'demo') return `showcases/${key}`
  return key
}

export function showcaseHubHash(mode: 'standalone' | 'demo'): string {
  return mode === 'demo' ? 'showcases' : ''
}
