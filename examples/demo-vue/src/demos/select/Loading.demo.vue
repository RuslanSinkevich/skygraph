<script setup lang="ts">
/**
 * `loading` on the whole select shows a spinner and disables input —
 * perfect while fetching options. Individual `option.loading` marks
 * a row as "still syncing" without blocking the others.
 */
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    fetching: 'Fetching options…',
    pickWorker: 'Pick a worker',
    w1: 'worker-01 (ready)',
    w2: 'worker-02 (syncing…)',
    w3: 'worker-03 (offline)',
  },
  ru: {
    fetching: 'Загрузка вариантов…',
    pickWorker: 'Выберите воркер',
    w1: 'worker-01 (готов)',
    w2: 'worker-02 (синхронизация…)',
    w3: 'worker-03 (офлайн)',
  },
} as const

const t = useDemoStrings(STRINGS)

const workerOptions = computed(() => [
  { label: t.value.w1, value: 'w1' },
  { label: t.value.w2, value: 'w2', loading: true },
  { label: t.value.w3, value: 'w3', disabled: true },
])
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgSelect loading :placeholder="t.fetching" :options="[]" />
    <SgSelect :placeholder="t.pickWorker" :options="workerOptions" />
  </div>
</template>
