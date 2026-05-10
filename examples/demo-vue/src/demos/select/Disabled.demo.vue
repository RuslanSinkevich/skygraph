<script setup lang="ts">
/**
 * Disable the whole select via `disabled`, or a single option by
 * flagging it in `options`. Disabled options stay visible but cannot be
 * picked.
 */
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { cityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'One option disabled',
    unavailable: 'Unavailable',
    moscow: 'Moscow',
    berlin: 'Berlin',
    tokyo: 'Tokyo',
    ny: 'New York',
    sp: 'São Paulo',
  },
  ru: {
    placeholder: 'Один вариант отключён',
    unavailable: 'Недоступно',
    moscow: 'Москва',
    berlin: 'Берлин',
    tokyo: 'Токио',
    ny: 'Нью-Йорк',
    sp: 'Сан-Паулу',
  },
} as const

type CityKey = 'moscow' | 'berlin' | 'tokyo' | 'ny' | 'sp'

const t = useDemoStrings(STRINGS)

const base = computed(() =>
  cityOptions.map((o) => ({ ...o, label: t.value[o.value as CityKey] })),
)

const withDisabledRow = computed(() => [
  ...base.value,
  { label: t.value.unavailable, value: 'x', disabled: true },
])
</script>

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap">
    <SgSelect disabled default-value="moscow" :options="base" />
    <SgSelect :placeholder="t.placeholder" :options="withDisabledRow" />
  </div>
</template>
