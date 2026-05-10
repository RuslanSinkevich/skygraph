<script setup lang="ts">
/**
 * Controlled — parent owns the selected date. `@update:modelValue` /
 * `@select` fires on any date pick, `@panelChange` fires when the user
 * navigates months.
 */
import { ref } from 'vue'
import { SgCalendar, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    selected: 'Selected:',
    today: 'Today',
    jan2030: 'Jan 1, 2030',
  },
  ru: {
    selected: 'Выбрано:',
    today: 'Сегодня',
    jan2030: '1 янв 2030',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<Date>(new Date())

function pickToday() {
  value.value = new Date()
}
function pickJan2030() {
  value.value = new Date(2030, 0, 1)
}
</script>

<template>
  <div style="display: grid; gap: 12px; max-width: 480px">
    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap">
      <span style="color: var(--sg-color-text-secondary)">
        {{ t.selected }} <strong>{{ value.toLocaleDateString() }}</strong>
      </span>
      <SgButton size="small" @click="pickToday">{{ t.today }}</SgButton>
      <SgButton size="small" @click="pickJan2030">{{ t.jan2030 }}</SgButton>
    </div>
    <SgCalendar v-model="value" />
  </div>
</template>
