<script setup lang="ts">
/**
 * Radio has no component tokens — the checked dot is driven by
 * `accent-color: var(--sg-color-primary)`. Scope the global tokens on
 * a wrapper to rebrand a single group.
 */
import type { CSSProperties } from 'vue'
import { SgRadio } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    brandA: 'Brand A',
    brandB: 'Brand B',
    brandC: 'Brand C',
  },
  ru: {
    brandA: 'Бренд A',
    brandB: 'Бренд B',
    brandC: 'Бренд C',
  },
} as const

const t = useDemoStrings(STRINGS)

const scoped = {
  '--sg-color-primary': 'var(--sg-green-6)',
  '--sg-color-text': 'var(--sg-green-9, #0b4417)',
  '--sg-padding-md': '24px',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgRadio
      default-value="b"
      :options="[
        { label: t.brandA, value: 'a' },
        { label: t.brandB, value: 'b' },
        { label: t.brandC, value: 'c' },
      ]"
    />
  </div>
</template>
