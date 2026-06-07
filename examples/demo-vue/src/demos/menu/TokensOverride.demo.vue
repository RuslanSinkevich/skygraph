<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Menu has
 * no `--sg-menu-*` tokens — it leans on the global palette
 * (`--sg-color-primary`, `--sg-color-primary-bg`, `--sg-color-bg-hover`),
 * so each scope re-skins one menu.
 */
import type { CSSProperties } from 'vue'
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { green: 'Green brand', dark: 'Dark surface', glass: 'Glass pick' },
  ru: { green: 'Зелёный бренд', dark: 'Тёмная поверхность', glass: 'Glass pick' },
} as const

const t = useDemoStrings(STRINGS)

const cardBase: CSSProperties = {
  padding: '12px',
  borderRadius: '16px',
  flex: '1 1 240px',
}
const labelBase: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  display: 'block',
  marginBottom: '10px',
  paddingLeft: '4px',
}

const greenScope = {
  '--sg-color-primary': '#059669',
  '--sg-color-primary-bg': '#d1fae5',
  '--sg-color-bg-hover': '#ecfdf5',
  '--sg-border-radius-lg': '12px',
  ...cardBase,
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
} as CSSProperties

const darkScope = {
  '--sg-color-primary': '#38bdf8',
  '--sg-color-primary-bg': '#1e3a5f',
  '--sg-color-bg-hover': '#1e293b',
  '--sg-color-bg-container': '#0f172a',
  '--sg-color-text': '#e2e8f0',
  '--sg-border-radius-lg': '12px',
  ...cardBase,
  background: '#0f172a',
  border: '1px solid #1e293b',
} as CSSProperties

const glassScope = {
  '--sg-color-primary': '#6366f1',
  '--sg-color-primary-bg': 'rgba(255, 255, 255, 0.55)',
  '--sg-color-bg-hover': 'rgba(255, 255, 255, 0.4)',
  '--sg-color-bg-container': 'transparent',
  '--sg-border-radius-lg': '12px',
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
      <SgMenu
        mode="inline"
        :items="sidebarItems"
        :default-open-keys="['team']"
        :default-selected-keys="['members']"
      />
    </div>
    <div :style="darkScope">
      <span :style="{ ...labelBase, color: '#94a3b8' }">{{ t.dark }}</span>
      <SgMenu
        mode="inline"
        :items="sidebarItems"
        :default-open-keys="['team']"
        :default-selected-keys="['members']"
      />
    </div>
    <div :style="glassScope">
      <span :style="{ ...labelBase, color: '#1e1b4b' }">{{ t.glass }}</span>
      <SgMenu
        mode="inline"
        :items="sidebarItems"
        :default-open-keys="['team']"
        :default-selected-keys="['members']"
      />
    </div>
  </div>
</template>
