<script setup lang="ts">
/**
 * Four sides are supported; the arrow anchors to the centre of the
 * trigger. There's no auto-flip — pick a side that fits your layout.
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
  },
  ru: {
    top: 'Сверху',
    bottom: 'Снизу',
    left: 'Слева',
    right: 'Справа',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(2, auto);
      gap: 12px;
      padding: 40px;
      justify-content: start;
    "
  >
    <SgTooltip :title="t.top" placement="top">
      <SgButton>{{ t.top }}</SgButton>
    </SgTooltip>
    <SgTooltip :title="t.bottom" placement="bottom">
      <SgButton>{{ t.bottom }}</SgButton>
    </SgTooltip>
    <SgTooltip :title="t.left" placement="left">
      <SgButton>{{ t.left }}</SgButton>
    </SgTooltip>
    <SgTooltip :title="t.right" placement="right">
      <SgButton>{{ t.right }}</SgButton>
    </SgTooltip>
  </div>
</template>
