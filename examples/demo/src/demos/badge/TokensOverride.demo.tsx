import type { CSSProperties } from 'react'
import { Badge } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    connecting: 'Connecting…',
  },
  ru: {
    connecting: 'Подключение…',
  },
} as const

const box = {
  width: 42,
  height: 42,
  borderRadius: 6,
  background: 'var(--sg-color-bg-container)',
  border: '1px solid color-mix(in srgb, var(--sg-color-error) 30%, transparent)',
  boxShadow: 'inset 0 0 0 1px color-mix(in srgb, white 55%, transparent)',
  display: 'inline-block',
}

/**
 * Badge has no component-specific tokens — `sg-badge-count` pulls
 * from `--sg-color-error` for the background and `--sg-color-bg` for
 * the tiny outline. Scope those globals to rebrand your counters.
 */
const scoped: CSSProperties = {
  ['--sg-color-error' as never]: '#7c3aed',
  ['--sg-color-primary' as never]: '#f97316',
  ['--sg-color-bg' as never]: '#fef3c7',
}

export function TokensOverrideBadge() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ ...scoped, display: 'flex', gap: 24, padding: 16, background: '#fef3c7' }}>
      <Badge count={5}><div style={box} /></Badge>
      <Badge dot><div style={box} /></Badge>
      <Badge status="processing" text={t.connecting} />
    </div>
  )
}
