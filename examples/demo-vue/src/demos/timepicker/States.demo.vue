<script setup lang="ts">
/**
 * `disabled` blocks the dropdown entirely. Vue delta: `SgTimePicker`
 * has no `loading` prop (see `findings/T-Vue-Demo-Forms.md` →
 * `timepicker-vue-feature-gaps`); to convey "fetching default" use
 * `disabled` together with a side label.
 */
import { ref } from 'vue'
import { onMounted } from 'vue'
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Loading default value…',
    placeholder: 'Loading…',
    note: 'No `loading` prop in Vue — using `disabled` + side label.',
  },
  ru: {
    label: 'Загружаем значение по умолчанию…',
    placeholder: 'Загрузка…',
    note: 'В Vue нет `loading`-prop — используем `disabled` + подпись.',
  },
} as const

const t = useDemoStrings(STRINGS)

const value = ref('')
const pending = ref(true)

onMounted(() => {
  setTimeout(() => {
    pending.value = false
    value.value = '14:00:00'
  }, 1500)
})
</script>

<template>
  <div style="display: grid; gap: 8px; max-width: 320px">
    <SgTimePicker disabled default-value="10:30:00" />
    <div style="display: flex; gap: 8px; align-items: center">
      <SgTimePicker v-model="value" :disabled="pending" :placeholder="t.placeholder" />
      <span v-if="pending" style="font-size: 12px; color: var(--sg-color-text-tertiary)">
        {{ t.label }}
      </span>
    </div>
    <span style="font-size: 11px; color: var(--sg-color-text-secondary)">
      {{ t.note }}
    </span>
  </div>
</template>
