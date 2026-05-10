<script setup lang="ts">
/**
 * Switch has no component-specific tokens. The track uses
 * `--sg-color-text-disabled` (off) and `--sg-color-primary` (on),
 * so scoping those globals rebrands the group instantly.
 */
import type { CSSProperties } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { on: 'ON', off: 'OFF' },
  ru: { on: 'ВКЛ', off: 'ВЫКЛ' },
} as const

const t = useDemoStrings(STRINGS)

const scoped = {
  '--sg-color-primary': '#e11d48',
  '--sg-color-text-disabled': 'rgba(225, 29, 72, 0.2)',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgSwitch default-checked />
    <SgSwitch default-checked>
      <template #checkedChildren>{{ t.on }}</template>
      <template #unCheckedChildren>{{ t.off }}</template>
    </SgSwitch>
    <SgSwitch />
  </div>
</template>
