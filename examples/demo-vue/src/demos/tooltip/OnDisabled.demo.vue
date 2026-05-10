<script setup lang="ts">
/**
 * Tooltip attaches its hover listeners to its own wrapper, not the
 * child — so a disabled Button underneath still reveals the tip
 * when the pointer enters the wrapper area.
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tipDisabled: 'Button is disabled — hover still works',
    disabled: 'Disabled',
    tipLocked: 'Icon explains the disabled state',
    locked: '🔒 Locked',
  },
  ru: {
    tipDisabled: 'Кнопка отключена — наведение всё равно работает',
    disabled: 'Отключено',
    tipLocked: 'Иконка объясняет отключённое состояние',
    locked: '🔒 Заблокировано',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px">
    <SgTooltip :title="t.tipDisabled">
      <SgButton disabled>{{ t.disabled }}</SgButton>
    </SgTooltip>
    <SgTooltip :title="t.tipLocked">
      <SgButton disabled>{{ t.locked }}</SgButton>
    </SgTooltip>
  </div>
</template>
