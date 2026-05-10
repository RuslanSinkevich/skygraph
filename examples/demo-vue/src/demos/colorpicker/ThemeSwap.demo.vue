<script setup lang="ts">
/**
 * Wire a ColorPicker straight into `--sg-color-primary`. Every
 * SkyGraph component in the wrapper inherits the new brand colour —
 * try it on the button and the input.
 */
import { computed, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { SgColorPicker, SgButton, SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    drives: 'drives --sg-color-primary',
    primary: 'Primary button',
    placeholder: 'Focus me to see the new brand tint',
  },
  ru: {
    drives: 'управляет --sg-color-primary',
    primary: 'Primary button',
    placeholder: 'Сфокусируй, чтобы увидеть новый акцент',
  },
} as const

const t = useDemoStrings(STRINGS)
const brand = ref('#1677ff')

const scope = computed<CSSProperties>(() => ({
  '--sg-color-primary': brand.value,
  '--sg-color-primary-hover': brand.value,
  '--sg-color-primary-bg': `${brand.value}20`,
  display: 'grid',
  gap: '12px',
  maxWidth: '320px',
}))
</script>

<template>
  <div :style="scope">
    <div style="display: flex; gap: 12px; align-items: center">
      <SgColorPicker v-model="brand" show-text />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">
        {{ t.drives }}
      </span>
    </div>
    <SgButton type="primary">{{ t.primary }}</SgButton>
    <SgInput :placeholder="t.placeholder" />
  </div>
</template>
