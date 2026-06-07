<script setup lang="ts">
/**
 * Floating label over the TimePicker control. The picker has no
 * free-text input, so the label floats on `:focus-within` (open) and a
 * JS-driven `fl-filled` class once a time is chosen — no core changes.
 */
import { ref, computed } from 'vue'
import { SgTimePicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { from: 'Opens at', to: 'Closes at' },
  ru: { from: 'Открытие', to: 'Закрытие' },
} as const

const t = useDemoStrings(STRINGS)

const from = ref('')
const to = ref('18:00:00')

const fromFilled = computed(() => from.value.length > 0)
const toFilled = computed(() => to.value.length > 0)
</script>

<template>
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': fromFilled }">
      <SgTimePicker v-model="from" placeholder=" " />
      <label class="fl-label">{{ t.from }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': toFilled }">
      <SgTimePicker v-model="to" placeholder=" " />
      <label class="fl-label">{{ t.to }}</label>
    </div>
  </div>
</template>

<style scoped>
.fl-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 560px;
}
.fl-field {
  position: relative;
  flex: 1 1 240px;
  min-width: 0;
  padding-top: 8px;
}
.fl-field :deep(.sg-timepicker),
.fl-field :deep(.sg-timepicker-input) {
  width: 100%;
}
.fl-field :deep(.sg-timepicker-input > span:first-child) {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fl-label {
  position: absolute;
  left: 12px;
  top: calc(50% + 4px);
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
  top: 8px;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
</style>
