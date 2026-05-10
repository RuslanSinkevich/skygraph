<script setup lang="ts">
/**
 * Controlled radio group. v-model gives you the selected value so you
 * can lift it into a store or form state.
 */
import { ref } from 'vue'
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    economy: 'Economy',
    standard: 'Standard',
    premium: 'Premium',
    selected: 'Selected:',
  },
  ru: {
    economy: 'Эконом',
    standard: 'Стандарт',
    premium: 'Премиум',
    selected: 'Выбрано:',
  },
} as const

const t = useDemoStrings(STRINGS)
const value = ref<string | number>('standard')
</script>

<template>
  <div style="display: grid; gap: 8px">
    <SgRadio
      v-model="value"
      :options="[
        { label: t.economy, value: 'economy' },
        { label: t.standard, value: 'standard' },
        { label: t.premium, value: 'premium' },
      ]"
    />
    <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.selected }} {{ String(value) }}
    </span>
  </div>
</template>
