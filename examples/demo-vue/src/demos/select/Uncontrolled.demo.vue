<script setup lang="ts">
/**
 * Uncontrolled — SkyGraph keeps the value internally; you read it via
 * `@change` or `@update:modelValue` when the user picks something.
 */
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { priorityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { p0: 'Critical', p1: 'High', p2: 'Normal', p3: 'Low' },
  ru: { p0: 'Критично', p1: 'Высокий', p2: 'Обычный', p3: 'Низкий' },
} as const

const t = useDemoStrings(STRINGS)

const options = computed(() =>
  priorityOptions.map((o) => ({
    ...o,
    label: t.value[o.value as 'p0' | 'p1' | 'p2' | 'p3'],
  })),
)

function onChange(v: string | number | (string | number)[]) {
  // eslint-disable-next-line no-console
  console.log('picked', v)
}
</script>

<template>
  <SgSelect default-value="p2" :options="options" @change="onChange" />
</template>
