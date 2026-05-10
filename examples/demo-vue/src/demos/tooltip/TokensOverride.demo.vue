<script setup lang="ts">
/**
 * Tooltip ships with dedicated tokens: `--sg-color-tooltip-bg` and
 * `--sg-color-tooltip-text`. Override them on a wrapper to swap the
 * tip's look without touching the global theme.
 */
import type { CSSProperties } from 'vue'
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    brandTip: 'Brand-coloured tooltip',
    brandButton: 'Brand tip',
    rounderTip: 'Rounder corners here too',
    bottom: 'Bottom',
  },
  ru: {
    brandTip: 'Подсказка в цветах бренда',
    brandButton: 'Брендовая подсказка',
    rounderTip: 'Скруглённые углы и здесь',
    bottom: 'Снизу',
  },
} as const

const t = useDemoStrings(STRINGS)

const scoped: CSSProperties = {
  ['--sg-color-tooltip-bg' as never]: '#7c3aed',
  ['--sg-color-tooltip-text' as never]: '#faf5ff',
  ['--sg-border-radius-sm' as never]: '8px',
}
</script>

<template>
  <div :style="{ ...scoped, display: 'flex', gap: '12px' }">
    <SgTooltip :title="t.brandTip">
      <SgButton>{{ t.brandButton }}</SgButton>
    </SgTooltip>
    <SgTooltip :title="t.rounderTip" placement="bottom">
      <SgButton>{{ t.bottom }}</SgButton>
    </SgTooltip>
  </div>
</template>
