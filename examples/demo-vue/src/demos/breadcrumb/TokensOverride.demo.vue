<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Breadcrumb
 * has no `--sg-breadcrumb-*` tokens — it leans on the global text palette
 * and `--sg-color-primary`, so each scope re-skins a single trail.
 */
import type { CSSProperties } from 'vue'
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { computed } from 'vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    home: 'Home',
    shop: 'Shop',
    current: 'Trousers',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    home: 'Главная',
    shop: 'Магазин',
    current: 'Брюки',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<BreadcrumbItem[]>(() => [
  { title: t.value.home, href: '#' },
  { title: t.value.shop, href: '#shop' },
  { title: t.value.current },
])

const cardBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '18px',
  borderRadius: '16px',
  flex: '1 1 220px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

const greenScope = {
  '--sg-color-primary': '#059669',
  '--sg-color-text-secondary': '#047857',
  '--sg-color-text': '#065f46',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-text-secondary': '#94a3b8',
  '--sg-color-text': '#e2e8f0',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#4f46e5',
  '--sg-color-text-secondary': '#4338ca',
  '--sg-color-text': '#1e1b4b',
  ...cardBase,
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(236, 72, 153, 0.3))',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <div :style="greenScope">
      <span :style="{ ...labelBase, color: '#047857' }">{{ t.green }}</span>
      <SgBreadcrumb :items="items" />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgBreadcrumb :items="items" />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgBreadcrumb :items="items" />
    </div>
  </div>
</template>
