<script setup lang="ts">
/**
 * Shared "token override" demo block used by every component page.
 *
 * Mirrors React `examples/demo/src/demos/_shared/TokenScopeCards.tsx` 1:1.
 *
 * Renders exactly three cards, each scoping a different subset of SkyGraph
 * tokens on a wrapper — the inner component (default scoped slot) is the same,
 * only the CSS variables around it change:
 *
 *   1. Branded green — `--sg-color-primary*` family (+ component primary tokens)
 *   2. Dark field    — dark surface / text / border tokens
 *   3. Glass pick    — translucent surface + blur + soft shadow
 *
 * Components pass component-specific token overrides via `extra` and render the
 * demoed component through the default scoped slot (`{ scope }`).
 */
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useDemoStrings } from '../../i18n'

export type TokenScopeKey = 'brand' | 'dark' | 'glass'

const props = withDefaults(
  defineProps<{
    /** Per-scope extra CSS variables merged on top of the base palette. */
    extra?: Partial<Record<TokenScopeKey, CSSProperties>>
    /** Minimum card width before the grid wraps. Larger for wide components. */
    minCardWidth?: number
    /** Minimum preview content width inside each card; overflow becomes local. */
    contentMinWidth?: number
    /** Horizontal alignment for the rendered component inside each token card. */
    contentAlign?: 'start' | 'center'
    /** Force a single vertical column — better for wide controls (e.g. Pagination). */
    stack?: boolean
  }>(),
  {
    minCardWidth: 280,
    contentAlign: 'start',
    stack: false,
  },
)

defineSlots<{
  default(props: { scope: TokenScopeKey }): unknown
}>()

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

const t = useDemoStrings(STRINGS)

/** Branded green — primary palette only, light surface. */
const BRAND_SCOPE: CSSProperties = {
  '--sg-color-primary': '#059669',
  '--sg-color-primary-hover': '#047857',
  '--sg-color-primary-active': '#065f46',
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-color-primary-border': '#6ee7b7',
  '--sg-color-bg-hover': 'rgba(5, 150, 105, 0.08)',
} as CSSProperties

/** Dark field — full surface / text / border palette flipped to slate. */
const DARK_SCOPE: CSSProperties = {
  '--sg-color-bg': '#0f172a',
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-elevated': '#1f2937',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-bg-disabled': '#0b1120',
  '--sg-color-text': '#f8fafc',
  '--sg-color-text-secondary': '#cbd5e1',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-quaternary': '#64748b',
  '--sg-color-text-placeholder': '#94a3b8',
  '--sg-color-text-disabled': '#64748b',
  '--sg-color-border': '#475569',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-hover': '#93c5fd',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.22)',
  '--sg-color-success': '#34d399',
  '--sg-color-success-bg': 'rgba(52, 211, 153, 0.18)',
  '--sg-color-warning': '#fbbf24',
  '--sg-color-warning-bg': 'rgba(251, 191, 36, 0.18)',
  '--sg-color-error': '#f87171',
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.18)',
  '--sg-color-star': '#fbbf24',
} as CSSProperties

/** Glass pick — translucent frosted surface + elevated shadow. */
const GLASS_SCOPE: CSSProperties = {
  '--sg-color-bg': 'rgba(255, 255, 255, 0.55)',
  '--sg-color-bg-container': 'rgba(255, 255, 255, 0.55)',
  '--sg-color-bg-elevated': 'rgba(255, 255, 255, 0.92)',
  '--sg-color-bg-hover': 'rgba(99, 102, 241, 0.08)',
  '--sg-color-border': 'rgba(15, 23, 42, 0.08)',
  '--sg-border-radius': '12px',
  '--sg-shadow-lg': '0 18px 38px -16px rgba(15, 23, 42, 0.4)',
  '--sg-color-primary': '#6366f1',
  '--sg-color-primary-bg': 'rgba(99, 102, 241, 0.16)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
} as CSSProperties

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

const cards = computed<{ key: TokenScopeKey; label: string; hint: string }[]>(() => [
  { key: 'brand', label: t.value.brand, hint: t.value.brandHint },
  { key: 'dark', label: t.value.dark, hint: t.value.darkHint },
  { key: 'glass', label: t.value.glass, hint: t.value.glassHint },
])

const gridStyle = computed<CSSProperties>(() => ({
  display: 'grid',
  gridTemplateColumns: props.stack
    ? '1fr'
    : `repeat(auto-fit, minmax(min(100%, ${props.minCardWidth}px), 1fr))`,
  gap: '16px',
  width: '100%',
  padding: 'var(--sg-padding-md, 12px) 0',
}))

function cardStyle(key: TokenScopeKey): CSSProperties {
  return {
    ...BASE[key],
    ...(props.extra?.[key] ?? {}),
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '14px',
    borderRadius: '14px',
    background: CARD_BG[key],
    border:
      key === 'brand'
        ? '1px solid var(--sg-color-border-secondary, rgba(15,23,42,0.1))'
        : '1px solid rgba(255, 255, 255, 0.18)',
  }
}

const contentWrapStyle = computed<CSSProperties>(() => ({
  minWidth: 0,
  overflowX: props.contentMinWidth ? 'auto' : undefined,
  paddingBottom: props.contentMinWidth ? '2px' : undefined,
}))

const innerStyle = computed<CSSProperties>(() => ({
  minWidth: props.contentMinWidth ? `${props.contentMinWidth}px` : undefined,
  display: props.contentAlign === 'center' ? 'flex' : undefined,
  justifyContent: props.contentAlign === 'center' ? 'center' : undefined,
}))
</script>

<template>
  <div :style="gridStyle">
    <div
      v-for="card in cards"
      :key="card.key"
      class="demo-token-scope-card"
      :style="cardStyle(card.key)"
    >
      <span :style="{ fontSize: '13px', fontWeight: 600, color: TITLE_COLOR[card.key] }">
        {{ card.label }}
      </span>
      <div
        :style="{
          fontSize: '11px',
          fontFamily: 'var(--sg-font-mono, monospace)',
          color: HINT_COLOR[card.key],
          marginBottom: '4px',
        }"
      >
        {{ card.hint }}
      </div>
      <div :style="contentWrapStyle">
        <div :style="innerStyle">
          <slot :scope="card.key" />
        </div>
      </div>
    </div>
  </div>
</template>
