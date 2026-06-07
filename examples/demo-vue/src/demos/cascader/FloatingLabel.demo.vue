<script setup lang="ts">
/**
 * Floating label over the Cascader control. The label floats on
 * `:focus-within` (open) and a JS-driven `fl-filled` class once a path
 * is chosen — no core changes.
 */
import { ref, computed } from 'vue'
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { region: 'Region', origin: 'Origin' },
  ru: { region: 'Регион', origin: 'Происхождение' },
} as const

const t = useDemoStrings(STRINGS)

const region = ref<(string | number)[]>([])
const origin = ref<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu'])

const regionFilled = computed(() => region.value.length > 0)
const originFilled = computed(() => origin.value.length > 0)
</script>

<template>
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': regionFilled }">
      <SgCascader v-model="region" :options="regionOptions" placeholder=" " />
      <label class="fl-label">{{ t.region }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': originFilled }">
      <SgCascader v-model="origin" :options="regionOptions" placeholder=" " />
      <label class="fl-label">{{ t.origin }}</label>
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
