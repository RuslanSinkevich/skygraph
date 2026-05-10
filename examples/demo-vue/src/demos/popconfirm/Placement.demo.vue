<script setup lang="ts">
/**
 * Four sides, anchored to the centre of the trigger. No auto-flip —
 * choose a placement that has room to open.
 */
import { SgButton, SgPopconfirm } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const t = useDemoStrings({
  en: {
    topTitle: 'Top placement',
    bottomTitle: 'Bottom placement',
    leftTitle: 'Left placement',
    rightTitle: 'Right placement',
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
  },
  ru: {
    topTitle: 'Размещение сверху',
    bottomTitle: 'Размещение снизу',
    leftTitle: 'Размещение слева',
    rightTitle: 'Размещение справа',
    top: 'Сверху',
    bottom: 'Снизу',
    left: 'Слева',
    right: 'Справа',
  },
})
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(2, auto);
      gap: 12px;
      padding: 60px;
      justify-content: start;
    "
  >
    <SgPopconfirm :title="t.topTitle" placement="top">
      <SgButton>{{ t.top }}</SgButton>
    </SgPopconfirm>
    <SgPopconfirm :title="t.bottomTitle" placement="bottom">
      <SgButton>{{ t.bottom }}</SgButton>
    </SgPopconfirm>
    <SgPopconfirm :title="t.leftTitle" placement="left">
      <SgButton>{{ t.left }}</SgButton>
    </SgPopconfirm>
    <SgPopconfirm :title="t.rightTitle" placement="right">
      <SgButton>{{ t.right }}</SgButton>
    </SgPopconfirm>
  </div>
</template>
