import type { CSSProperties, ReactNode } from 'react'
import { useDemoStrings } from '../../i18n'

/**
 * Shared "token override" demo block used by every component page.
 *
 * Renders exactly three cards, each scoping a different subset of SkyGraph
 * tokens on a wrapper — the inner component is identical, only the CSS
 * variables around it change:
 *
 *   1. Branded green — `--sg-color-primary*` family (+ component primary tokens)
 *   2. Dark field    — dark surface / text / border tokens
 *   3. Glass pick    — translucent surface + blur + soft shadow
 *
 * Components pass component-specific token overrides via `extra` (e.g. input
 * controls add `--sg-input-*`), and a `render` function that returns the
 * component instance for each card.
 */
export type TokenScopeKey = 'brand' | 'dark' | 'glass'

const STRINGS = {
  en: {
    brand: 'Branded green',
    brandHint: '--sg-color-primary*',
    dark: 'Dark field',
    darkHint: 'dark surface + text',
    glass: 'Glass pick',
    glassHint: 'translucent + blur + shadow',
  },
  ru: {
    brand: 'Зелёный бренд',
    brandHint: '--sg-color-primary*',
    dark: 'Тёмное поле',
    darkHint: 'тёмный фон + текст',
    glass: 'Glass pick',
    glassHint: 'полупрозрачный + blur + тень',
  },
} as const

/** Branded green — primary palette only, light surface. */
export const BRAND_SCOPE: CSSProperties = {
  ['--sg-color-primary' as never]: '#059669',
  ['--sg-color-primary-hover' as never]: '#047857',
  ['--sg-color-primary-active' as never]: '#065f46',
  ['--sg-color-primary-bg' as never]: '#d1fae5',
  ['--sg-color-primary-border' as never]: '#6ee7b7',
  ['--sg-color-bg-hover' as never]: 'rgba(5, 150, 105, 0.08)',
}

/** Dark field — full surface / text / border palette flipped to slate. */
export const DARK_SCOPE: CSSProperties = {
  ['--sg-color-bg' as never]: '#0f172a',
  ['--sg-color-bg-container' as never]: '#0f172a',
  ['--sg-color-bg-elevated' as never]: '#0f172a',
  ['--sg-color-bg-hover' as never]: '#1e293b',
  ['--sg-color-text' as never]: '#e2e8f0',
  ['--sg-color-text-secondary' as never]: '#94a3b8',
  ['--sg-color-text-tertiary' as never]: '#64748b',
  ['--sg-color-text-placeholder' as never]: '#64748b',
  ['--sg-color-border' as never]: '#1e293b',
  ['--sg-color-border-secondary' as never]: '#1e293b',
  ['--sg-color-primary' as never]: '#60a5fa',
  ['--sg-color-primary-bg' as never]: 'rgba(96, 165, 250, 0.18)',
}

/** Glass pick — translucent frosted surface + elevated shadow. */
export const GLASS_SCOPE: CSSProperties = {
  ['--sg-color-bg' as never]: 'rgba(255, 255, 255, 0.55)',
  ['--sg-color-bg-container' as never]: 'rgba(255, 255, 255, 0.55)',
  ['--sg-color-bg-elevated' as never]: 'rgba(255, 255, 255, 0.92)',
  ['--sg-color-bg-hover' as never]: 'rgba(99, 102, 241, 0.08)',
  ['--sg-color-border' as never]: 'rgba(15, 23, 42, 0.08)',
  ['--sg-border-radius' as never]: '12px',
  ['--sg-shadow-lg' as never]: '0 18px 38px -16px rgba(15, 23, 42, 0.4)',
  ['--sg-color-primary' as never]: '#6366f1',
  ['--sg-color-primary-bg' as never]: 'rgba(99, 102, 241, 0.16)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
}

const BASE: Record<TokenScopeKey, CSSProperties> = {
  brand: BRAND_SCOPE,
  dark: DARK_SCOPE,
  glass: GLASS_SCOPE,
}

const CARD_BG: Record<TokenScopeKey, string> = {
  brand: 'var(--sg-color-bg, #ffffff)',
  dark: '#020617',
  glass: 'linear-gradient(135deg, #a5b4fc, #fbcfe8)',
}

const TITLE_COLOR: Record<TokenScopeKey, string> = {
  brand: 'var(--sg-color-text)',
  dark: '#e2e8f0',
  glass: '#1e1b4b',
}

const HINT_COLOR: Record<TokenScopeKey, string> = {
  brand: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
  dark: 'rgba(226, 232, 240, 0.6)',
  glass: 'rgba(30, 27, 75, 0.7)',
}

export type TokenScopeCardsProps = {
  /** Per-scope extra CSS variables merged on top of the base palette. */
  extra?: Partial<Record<TokenScopeKey, CSSProperties>>
  /** Returns the demoed component for a given scope. */
  render: (scope: TokenScopeKey) => ReactNode
}

export function TokenScopeCards({ extra, render }: TokenScopeCardsProps) {
  const t = useDemoStrings(STRINGS)

  const cards: { key: TokenScopeKey; label: string; hint: string }[] = [
    { key: 'brand', label: t.brand, hint: t.brandHint },
    { key: 'dark', label: t.dark, hint: t.darkHint },
    { key: 'glass', label: t.glass, hint: t.glassHint },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        width: '100%',
        padding: 'var(--sg-padding-md, 12px) 0',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.key}
          style={{
            ...BASE[card.key],
            ...(extra?.[card.key] ?? {}),
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 14,
            borderRadius: 14,
            background: CARD_BG[card.key],
            border:
              card.key === 'brand'
                ? '1px solid var(--sg-color-border-secondary, rgba(15,23,42,0.1))'
                : '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: TITLE_COLOR[card.key] }}>
            {card.label}
          </span>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--sg-font-mono, monospace)',
              color: HINT_COLOR[card.key],
              marginBottom: 4,
            }}
          >
            {card.hint}
          </div>
          {render(card.key)}
        </div>
      ))}
    </div>
  )
}
