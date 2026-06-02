import type { CSSProperties } from 'react'
import { Skeleton } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

/**
 * Three skeleton skins built only from `--sg-skeleton-bg`,
 * `--sg-skeleton-shimmer` and `--sg-border-radius-sm`. The shimmer
 * always reads as a sweep because the highlight token is brighter
 * than the base.
 */
const STRINGS = {
  en: {
    cardLabel: 'Light · card',
    brandLabel: 'Indigo · branded',
    darkLabel: 'Dark mode',
  },
  ru: {
    cardLabel: 'Светлая · карточка',
    brandLabel: 'Индиго · фирменная',
    darkLabel: 'Тёмная тема',
  },
} as const

const labelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 12,
  display: 'block',
}

const cardScope: CSSProperties = {
  ['--sg-skeleton-bg' as never]: '#e2e8f0',
  ['--sg-skeleton-shimmer' as never]: '#f8fafc',
  ['--sg-border-radius-sm' as never]: '8px',
  padding: 18,
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: 14,
  boxShadow: '0 8px 24px -10px rgba(15, 23, 42, 0.12)',
}

const brandScope: CSSProperties = {
  ['--sg-skeleton-bg' as never]: '#c7d2fe',
  ['--sg-skeleton-shimmer' as never]: '#e0e7ff',
  ['--sg-border-radius-sm' as never]: '999px',
  padding: 18,
  background: 'linear-gradient(135deg, #eef2ff 0%, #ddd6fe 100%)',
  borderRadius: 14,
}

const darkScope: CSSProperties = {
  ['--sg-skeleton-bg' as never]: 'rgba(148, 163, 184, 0.18)',
  ['--sg-skeleton-shimmer' as never]: 'rgba(226, 232, 240, 0.45)',
  ['--sg-border-radius-sm' as never]: '6px',
  padding: 18,
  background: '#0f172a',
  borderRadius: 14,
}

export function TokensOverrideSkeleton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 18,
      }}
    >
      <div style={cardScope}>
        <span style={{ ...labelStyle, color: '#475569' }}>{t.cardLabel}</span>
        <Skeleton active avatar paragraph={{ rows: 3 }} />
      </div>
      <div style={brandScope}>
        <span style={{ ...labelStyle, color: '#4338ca' }}>{t.brandLabel}</span>
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
      <div style={darkScope}>
        <span style={{ ...labelStyle, color: '#cbd5e1' }}>{t.darkLabel}</span>
        <Skeleton active avatar paragraph={{ rows: 3 }} />
      </div>
    </div>
  )
}
