<script setup lang="ts">
import { SgSwitch } from '@skygraph/vue'

const pill = {
  padding: '4px 10px',
  border: '1px solid var(--sg-color-border)',
  borderRadius: '999px',
  background: 'transparent',
}
</script>

<template>
  <div style="display: flex; gap: 12px">
    <SgSwitch unstyled default-checked :style="pill">
      <template #checkedChildren>On</template>
      <template #unCheckedChildren>Off</template>
    </SgSwitch>
    <SgSwitch unstyled :style="pill">
      <template #checkedChildren>On</template>
      <template #unCheckedChildren>Off</template>
    </SgSwitch>
  </div>
</template>
