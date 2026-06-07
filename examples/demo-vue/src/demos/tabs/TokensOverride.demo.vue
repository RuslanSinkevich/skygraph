<script setup lang="ts">
/**
 * Single "token override" block with three ready-made scopes. Tabs read
 * `--sg-color-primary` for the active ink bar / label and the surface
 * tokens for the strip, so each scope reskins one Tabs without bespoke
 * CSS.
 */
import { computed } from 'vue'
import { SgTabs, type TabItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    green: 'Green brand',
    dark: 'Dark surface',
    glass: 'Glass pick',
    tab1: 'Overview',
    tab2: 'Activity',
    tab3: 'Settings',
    panel1: 'High-level summary of the resource.',
    panel2: 'Recent events and audit log.',
    panel3: 'Configuration options.',
  },
  ru: {
    green: 'Зелёный бренд',
    dark: 'Тёмная поверхность',
    glass: 'Glass pick',
    tab1: 'Обзор',
    tab2: 'Активность',
    tab3: 'Настройки',
    panel1: 'Краткая сводка по объекту.',
    panel2: 'Недавние события и журнал.',
    panel3: 'Параметры и опции.',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<TabItem[]>(() => [
  { key: '1', label: t.value.tab1, content: t.value.panel1 },
  { key: '2', label: t.value.tab2, content: t.value.panel2 },
  { key: '3', label: t.value.tab3, content: t.value.panel3 },
])
</script>

<template>
  <div class="tabs-token-grid">
    <div class="tabs-token-card tabs-token-card--green">
      <span class="tabs-token-label">{{ t.green }}</span>
      <SgTabs type="line" :items="items" />
    </div>
    <div class="tabs-token-card tabs-token-card--dark">
      <span class="tabs-token-label">{{ t.dark }}</span>
      <SgTabs type="line" :items="items" />
    </div>
    <div class="tabs-token-card tabs-token-card--glass">
      <span class="tabs-token-label">{{ t.glass }}</span>
      <SgTabs type="line" :items="items" />
    </div>
  </div>
</template>

<style scoped>
.tabs-token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.tabs-token-card {
  padding: 16px;
  border-radius: 16px;
}
.tabs-token-label {
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.tabs-token-card--green {
  --sg-color-primary: #059669;
  --sg-color-primary-hover: #047857;
  --sg-color-bg-hover: #ecfdf5;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}
.tabs-token-card--green .tabs-token-label {
  color: #047857;
}
.tabs-token-card--dark {
  --sg-color-primary: #38bdf8;
  --sg-color-text: #e2e8f0;
  --sg-color-text-secondary: #cbd5e1;
  --sg-color-border-secondary: #334155;
  --sg-color-bg-hover: #1e293b;
  background: #0f172a;
  border: 1px solid #1e293b;
}
.tabs-token-card--dark .tabs-token-label {
  color: #94a3b8;
}
.tabs-token-card--glass {
  --sg-color-primary: #4f46e5;
  --sg-color-text: #111827;
  --sg-color-text-secondary: #334155;
  --sg-color-border-secondary: rgba(255, 255, 255, 0.7);
  --sg-color-bg-hover: rgba(255, 255, 255, 0.78);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(236, 72, 153, 0.3));
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(10px);
}
.tabs-token-card--glass .tabs-token-label {
  color: #1e1b4b;
}
</style>
