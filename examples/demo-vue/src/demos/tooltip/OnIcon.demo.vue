<script setup lang="ts">
/**
 * Classic "info icon" pattern: a small glyph with a Tooltip for the
 * extra context. Give the icon `tabIndex="0"` so keyboard users can
 * focus it and read the tip too.
 */
import { SgTooltip } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Brand score',
    tooltip: 'Weighted average of NPS, reviews, and social sentiment (0–100).',
    aria: 'More info about brand score',
  },
  ru: {
    label: 'Оценка бренда',
    tooltip: 'Взвешенное среднее NPS, отзывов и социальных сигналов (0–100).',
    aria: 'Подробнее об оценке бренда',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 8px">
    <label style="font-weight: 500">{{ t.label }}</label>
    <SgTooltip :title="t.tooltip">
      <span
        tabindex="0"
        :aria-label="t.aria"
        style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--sg-color-bg-container-disabled, #e5e7eb);
          color: var(--sg-color-text-secondary, #4b5563);
          font-size: 12px;
          cursor: help;
          user-select: none;
        "
      >
        ?
      </span>
    </SgTooltip>
  </div>
</template>
