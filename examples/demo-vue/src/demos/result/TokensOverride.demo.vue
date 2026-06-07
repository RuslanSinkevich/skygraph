<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Result has
 * no component-private tokens — it reads the semantic colours for the
 * icon tint, the text palette for title / subtitle and
 * `--sg-color-bg-secondary` for the body panel, so each scope rebrands it.
 */
import type { CSSProperties } from 'vue'
import { SgResult, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    done: 'All good',
    sub: 'Scoped via component tokens',
    cta: 'Continue',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    done: 'Всё готово',
    sub: 'Скоуп через токены компонента',
    cta: 'Продолжить',
  },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '12px',
  borderRadius: '16px',
  flex: '1 1 260px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '4px',
  paddingLeft: '8px',
}

const greenScope = {
  '--sg-color-success': '#059669',
  '--sg-color-primary': '#059669',
  '--sg-color-bg-secondary': '#ecfdf5',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-success': '#34d399',
  '--sg-color-primary': '#38bdf8',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-text-secondary': '#94a3b8',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-success': '#6366f1',
  '--sg-color-primary': '#6366f1',
  '--sg-color-bg-secondary': 'rgba(255, 255, 255, 0.4)',
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
      <SgResult status="success" :title="t.done" :sub-title="t.sub">
        <template #extra
          ><SgButton type="primary">{{ t.cta }}</SgButton></template
        >
      </SgResult>
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgResult status="success" :title="t.done" :sub-title="t.sub">
        <template #extra
          ><SgButton type="primary">{{ t.cta }}</SgButton></template
        >
      </SgResult>
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgResult status="success" :title="t.done" :sub-title="t.sub">
        <template #extra
          ><SgButton type="primary">{{ t.cta }}</SgButton></template
        >
      </SgResult>
    </div>
  </div>
</template>
