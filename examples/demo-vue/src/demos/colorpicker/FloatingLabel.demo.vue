<script setup lang="ts">
/**
 * Floating label over the ColorPicker trigger. The picker always carries
 * a colour, so the label rests in its floated position and lifts its
 * accent on `:focus-within` (open) — no core changes.
 */
import { ref } from 'vue'
import { SgColorPicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { brand: 'Brand colour', accent: 'Accent colour' },
  ru: { brand: 'Цвет бренда', accent: 'Акцентный цвет' },
} as const

const t = useDemoStrings(STRINGS)

const brand = ref('#2563eb')
const accent = ref('#f59e0b')
</script>

<template>
  <div class="fl-row">
    <div class="fl-field fl-filled">
      <SgColorPicker v-model="brand" show-text />
      <label class="fl-label">{{ t.brand }}</label>
    </div>
    <div class="fl-field fl-filled">
      <SgColorPicker v-model="accent" show-text />
      <label class="fl-label">{{ t.accent }}</label>
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
  flex: 1 1 200px;
  padding-top: 10px;
}
.fl-label {
  position: absolute;
  left: 4px;
  top: 16px;
  font-size: 14px;
  color: var(--sg-color-text-secondary, rgba(0, 0, 0, 0.65));
  pointer-events: none;
  white-space: nowrap;
  transition:
    top 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.18s ease;
}
.fl-field:focus-within .fl-label,
.fl-field.fl-filled .fl-label {
  top: 0;
  transform: scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
</style>
