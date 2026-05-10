<script setup lang="ts">
/**
 * Controlled slider. Drag the handle or focus it and use the arrow
 * keys — every value change is emitted via v-model.
 */
import { ref } from 'vue'
import { SgSlider } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { value: 'value:' },
  ru: { value: 'значение:' },
} as const

const t = useDemoStrings(STRINGS)
const value = ref(40)
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 360px">
    <SgSlider v-model="value" />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.value }} {{ value }}
    </span>
  </div>
</template>
