<script setup lang="ts">
/**
 * `unstyled` renders a native `<select>` with no SkyGraph styling.
 * Useful when you're embedding into a foreign design system and only
 * need the controlled-value wiring.
 */
import { computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { cityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Native select',
    moscow: 'Moscow',
    berlin: 'Berlin',
    tokyo: 'Tokyo',
    ny: 'New York',
    sp: 'São Paulo',
  },
  ru: {
    placeholder: 'Нативный select',
    moscow: 'Москва',
    berlin: 'Берлин',
    tokyo: 'Токио',
    ny: 'Нью-Йорк',
    sp: 'Сан-Паулу',
  },
} as const

type CityKey = 'moscow' | 'berlin' | 'tokyo' | 'ny' | 'sp'

const t = useDemoStrings(STRINGS)

const options = computed(() =>
  cityOptions.map((o) => ({ ...o, label: t.value[o.value as CityKey] })),
)
</script>

<template>
  <SgSelect
    unstyled
    :placeholder="t.placeholder"
    :options="options"
    default-value="berlin"
    style="padding: 6px 10px; border-radius: 4px"
  />
</template>
