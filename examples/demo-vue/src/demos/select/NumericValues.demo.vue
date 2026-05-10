<script setup lang="ts">
/**
 * `value` can be a string OR a number. SkyGraph keeps the original
 * type, which matters when wiring to APIs that expect numeric IDs.
 */
import { computed, ref } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { numberOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    valuePrefix: 'value:',
    typeofLabel: 'typeof',
    one: 'One',
    two: 'Two',
    three: 'Three',
  },
  ru: {
    valuePrefix: 'значение:',
    typeofLabel: 'тип',
    one: 'Один',
    two: 'Два',
    three: 'Три',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<string | number>(2)

const options = computed(() =>
  numberOptions.map((o) => ({
    ...o,
    label: o.value === 1 ? t.value.one : o.value === 2 ? t.value.two : t.value.three,
  })),
)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
    <SgSelect v-model="value" :options="options" />
    <span style="font-size: 13px; color: var(--sg-color-text-secondary)">
      {{ t.valuePrefix }} <code>{{ JSON.stringify(value) }}</code> ({{ t.typeofLabel }}
      <code>{{ typeof value }}</code>)
    </span>
  </div>
</template>
