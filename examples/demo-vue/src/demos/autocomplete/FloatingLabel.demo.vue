<script setup lang="ts">
/**
 * Floating label over the AutoComplete field. The label floats on
 * `:focus-within` (typing / open) and via a JS-driven `fl-filled` class
 * once the field holds a value — no core changes.
 */
import { ref, computed } from 'vue'
import { SgAutoComplete } from '@skygraph/vue'
import { frameworkOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { framework: 'Framework', stack: 'Preferred stack' },
  ru: { framework: 'Фреймворк', stack: 'Предпочитаемый стек' },
} as const

const t = useDemoStrings(STRINGS)

const a = ref('')
const b = ref('Vue')

const aFilled = computed(() => a.value.length > 0)
const bFilled = computed(() => b.value.length > 0)
</script>

<template>
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': aFilled }">
      <SgAutoComplete v-model="a" :options="frameworkOptions" placeholder=" " />
      <label class="fl-label">{{ t.framework }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': bFilled }">
      <SgAutoComplete v-model="b" :options="frameworkOptions" placeholder=" " />
      <label class="fl-label">{{ t.stack }}</label>
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
