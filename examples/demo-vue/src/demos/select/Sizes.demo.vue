<script setup lang="ts">
/** Three sizes — match whatever form/toolbar density you're going for. */
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { numberOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    small: 'Small',
    middle: 'Default',
    large: 'Large',
    one: 'One',
    two: 'Two',
    three: 'Three',
  },
  ru: {
    small: 'Маленький',
    middle: 'Обычный',
    large: 'Большой',
    one: 'Один',
    two: 'Два',
    three: 'Три',
  },
} as const

const t = useDemoStrings(STRINGS)

const options = computed(() =>
  numberOptions.map((o) => ({
    ...o,
    label: o.value === 1 ? t.value.one : o.value === 2 ? t.value.two : t.value.three,
  })),
)
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgSelect size="small" :placeholder="t.small" :options="options" />
    <SgSelect :placeholder="t.middle" :options="options" />
    <SgSelect size="large" :placeholder="t.large" :options="options" />
  </div>
</template>
