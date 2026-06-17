<script setup lang="ts">
/**
 * Floating label over the DatePicker control. The shared `FloatingField`
 * tracks focus via bubbling `focusin` / `focusout` and defers the blur one
 * frame, so choosing a date never makes the label flicker.
 */
import { ref, computed } from 'vue'
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { start: 'Start date', due: 'Due date' },
  ru: { start: 'Дата начала', due: 'Дата сдачи' },
} as const

const t = useDemoStrings(STRINGS)

const start = ref<Date | null>(null)
const due = ref<Date | null>(new Date())

const startFilled = computed(() => start.value != null)
const dueFilled = computed(() => due.value != null)
</script>

<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap; max-width: 560px">
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.start" :filled="startFilled">
        <SgDatePicker v-model="start" placeholder=" " allow-clear />
      </FloatingField>
    </div>
    <div style="flex: 1 1 240px; min-width: 0; padding-top: 8px">
      <FloatingField :label="t.due" :filled="dueFilled">
        <SgDatePicker v-model="due" placeholder=" " allow-clear />
      </FloatingField>
    </div>
  </div>
</template>
