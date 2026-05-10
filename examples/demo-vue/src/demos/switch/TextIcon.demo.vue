<script setup lang="ts">
/**
 * Vue exposes the inner labels as named slots `#checkedChildren` /
 * `#unCheckedChildren` (React props of the same name). Keep contents
 * to 1–3 chars so the thumb stays aligned.
 */
import { SgSwitch } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { on: 'ON', off: 'OFF' },
  ru: { on: 'ВКЛ', off: 'ВЫКЛ' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <SgSwitch default-checked>
      <template #checkedChildren>{{ t.on }}</template>
      <template #unCheckedChildren>{{ t.off }}</template>
    </SgSwitch>
    <SgSwitch>
      <template #checkedChildren>1</template>
      <template #unCheckedChildren>0</template>
    </SgSwitch>
    <SgSwitch default-checked>
      <template #checkedChildren>✓</template>
      <template #unCheckedChildren>✕</template>
    </SgSwitch>
  </div>
</template>
