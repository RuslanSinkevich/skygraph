<script setup lang="ts">
/**
 * Floating label over the DatePicker control. The picker has no
 * free-text input, so the label floats on `:focus-within` (open) and a
 * JS-driven `fl-filled` class once a date is chosen — no core changes.
 */
import { ref, computed } from 'vue'
import { SgDatePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

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
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': startFilled }">
      <SgDatePicker v-model="start" placeholder=" " allow-clear />
      <label class="fl-label">{{ t.start }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': dueFilled }">
      <SgDatePicker v-model="due" placeholder=" " allow-clear />
      <label class="fl-label">{{ t.due }}</label>
    </div>
  </div>
</template>

<style scoped>
.fl-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 560px;
}
.fl-field {
  position: relative;
  flex: 1 1 240px;
}
.fl-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--sg-color-text-secondary, rgba(0, 0, 0, 0.65));
  background: var(--sg-color-bg-container, #fff);
  padding: 0 4px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1;
  transition:
    top 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.18s ease;
}
.fl-field:focus-within .fl-label,
.fl-field.fl-filled .fl-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
</style>
