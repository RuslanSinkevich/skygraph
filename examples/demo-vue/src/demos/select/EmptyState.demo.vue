<script setup lang="ts">
/**
 * Async loading scenarios. The Vue `SgSelect` has no `loading` prop and
 * `SelectOption.loading` is also absent (see `findings/T-Vue-Demo-Forms.md`
 * → `select-loading-not-in-vue`). The closest paritetic story is
 * `disabled` + an empty option list while a request is in flight, plus a
 * regular options list with one disabled row marking an unsynced worker.
 */
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
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgSelect disabled :placeholder="t.fetching" :options="[]" />
    <SgSelect
      :placeholder="t.pickWorker"
      :options="[
        { label: t.w1, value: 'w1' },
        { label: t.w2, value: 'w2', disabled: true },
        { label: t.w3, value: 'w3', disabled: true },
      ]"
    />
  </div>
</template>
