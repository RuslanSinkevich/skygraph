<script setup lang="ts">
/**
 * The `title` slot accepts full markup — drop a heading + description
 * combo. The default tooltip content box uses `white-space: nowrap`,
 * so wrap wide content in a sized `<div>` as below.
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    commit: 'Commit',
    commitDesc: 'Saves the current state to the history — press ⌘⏎ to commit quickly.',
    hoverDetails: 'Hover for details',
    networkOnline: 'Network: online',
    iconText: 'Icon + text',
  },
  ru: {
    commit: 'Коммит',
    commitDesc: 'Сохраняет текущее состояние в историю — нажмите ⌘⏎ для быстрого коммита.',
    hoverDetails: 'Наведите для деталей',
    networkOnline: 'Сеть: онлайн',
    iconText: 'Иконка + текст',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px">
    <SgTooltip>
      <template #title>
        <div style="max-width: 220px; white-space: normal; line-height: 1.45">
          <strong style="display: block; margin-bottom: 4px">{{ t.commit }}</strong>
          <span style="font-size: 12px; opacity: 0.85">{{ t.commitDesc }}</span>
        </div>
      </template>
      <SgButton>{{ t.hoverDetails }}</SgButton>
    </SgTooltip>
    <SgTooltip>
      <template #title>
        <div style="display: flex; align-items: center; gap: 6px">
          <span aria-hidden="true">⚡</span>
          {{ t.networkOnline }}
        </div>
      </template>
      <SgButton>{{ t.iconText }}</SgButton>
    </SgTooltip>
  </div>
</template>
