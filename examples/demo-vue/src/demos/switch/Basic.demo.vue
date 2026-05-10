<script setup lang="ts">
/**
 * Controlled toggle. v-model gives you the next boolean so you can
 * persist it, sync it, or derive UI state from it.
 */
import { ref } from 'vue'
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { on: 'On', off: 'Off' },
  ru: { on: 'Вкл', off: 'Выкл' },
} as const

const t = useDemoStrings(STRINGS)
const checked = ref(false)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgSwitch v-model="checked" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ checked ? t.on : t.off }}
    </span>
  </div>
</template>
