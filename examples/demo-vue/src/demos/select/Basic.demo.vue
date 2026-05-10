<script setup lang="ts">
/**
 * Controlled select. v-model is the canonical pattern — use
 * `defaultValue` to start uncontrolled.
 */
import { computed, ref } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { cityOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    placeholder: 'Choose a city',
    moscow: 'Moscow',
    berlin: 'Berlin',
    tokyo: 'Tokyo',
    ny: 'New York',
    sp: 'São Paulo',
  },
  ru: {
    placeholder: 'Выберите город',
    moscow: 'Москва',
    berlin: 'Берлин',
    tokyo: 'Токио',
    ny: 'Нью-Йорк',
    sp: 'Сан-Паулу',
  },
} as const

type CityKey = 'moscow' | 'berlin' | 'tokyo' | 'ny' | 'sp'

const t = useDemoStrings(STRINGS)
const value = ref<string | number>('')

const options = computed(() =>
  cityOptions.map((o) => ({ ...o, label: t.value[o.value as CityKey] })),
)
</script>

<template>
  <SgSelect v-model="value" :placeholder="t.placeholder" :options="options" />
</template>
