<script setup lang="ts">
/**
 * Start + end pair that share a format. Both panels open together in
 * one dropdown. Use it for "working hours", "shift window", etc.
 */
import { ref } from 'vue'
import { SgTimeRangePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { empty: 'Nothing picked yet.' },
  ru: { empty: 'Значения пока нет.' },
} as const

const t = useDemoStrings(STRINGS)
const range = ref<[string, string]>(['', ''])
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 380px">
    <SgTimeRangePicker
      v-model="range"
      format="HH:mm"
      :show-second="false"
      :placeholder="['From', 'To']"
    />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ range[0] || range[1] ? `[${range[0] || '—'}, ${range[1] || '—'}]` : t.empty }}
    </span>
  </div>
</template>
