<script setup lang="ts">
/**
 * Floating label for the Select control. Select has no free-text input,
 * so the label floats based on `:focus-within` (open / focused) and a
 * JS-driven `fl-filled` class (a value is selected) — no core changes.
 */
import { ref, computed } from 'vue'
import { SgSelect } from '@skygraph/vue'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { fruit: 'Favourite fruit', city: 'City' },
  ru: { fruit: 'Любимый фрукт', city: 'Город' },
} as const

const t = useDemoStrings(STRINGS)

const cityOptions = [
  { label: 'Moscow', value: 'moscow' },
  { label: 'Berlin', value: 'berlin' },
  { label: 'Tokyo', value: 'tokyo' },
]

const fruit = ref<string | number | undefined>(undefined)
const city = ref<string | number | undefined>('berlin')

const fruitFilled = computed(() => fruit.value != null && fruit.value !== '')
const cityFilled = computed(() => city.value != null && city.value !== '')
</script>

<template>
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': fruitFilled }">
      <SgSelect v-model="fruit" :options="fruitOptions" placeholder=" " />
      <label class="fl-label">{{ t.fruit }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': cityFilled }">
      <SgSelect v-model="city" :options="cityOptions" placeholder=" " />
      <label class="fl-label">{{ t.city }}</label>
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
