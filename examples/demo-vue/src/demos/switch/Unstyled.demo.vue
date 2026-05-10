<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class and the visual track. Semantics
 * stay (`role="switch"`, `aria-checked`) — style it yourself, or use
 * the `#checkedChildren` / `#unCheckedChildren` slots for the on/off
 * labels.
 */
import type { CSSProperties } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { on: 'On', off: 'Off' },
  ru: { on: 'Вкл', off: 'Выкл' },
} as const

const t = useDemoStrings(STRINGS)

const pill = {
  padding: '4px 10px',
  border: '1px solid var(--sg-color-border)',
  borderRadius: '999px',
  background: 'transparent',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 12px">
    <SgSwitch unstyled default-checked :style="pill">
      <template #checkedChildren>{{ t.on }}</template>
      <template #unCheckedChildren>{{ t.off }}</template>
    </SgSwitch>
    <SgSwitch unstyled :style="pill">
      <template #checkedChildren>{{ t.on }}</template>
      <template #unCheckedChildren>{{ t.off }}</template>
    </SgSwitch>
  </div>
</template>
