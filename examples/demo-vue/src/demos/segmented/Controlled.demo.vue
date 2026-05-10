<script setup lang="ts">
/**
 * Fully controlled: drive `value` from your own state and mirror
 * the change back through `@change`. Use this when the
 * selection needs to round-trip through a URL, store or form.
 */
import { computed, ref } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: {
    selected: 'Selected:',
    map: 'Map',
    transit: 'Transit',
    satellite: 'Satellite',
  },
  ru: {
    selected: 'Выбрано:',
    map: 'Карта',
    transit: 'Транспорт',
    satellite: 'Спутник',
  },
})

const value = ref('Map')
function onChange(v: string) {
  value.value = v
}

const options = computed(() => [
  { label: t.value.map, value: 'Map' },
  { label: t.value.transit, value: 'Transit' },
  { label: t.value.satellite, value: 'Satellite' },
])
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgSegmented :options="options" :value="value" @change="onChange" />
    <span style="color: var(--sg-color-text-secondary)">{{ t.selected }} {{ value }}</span>
  </div>
</template>
