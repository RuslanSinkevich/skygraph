<script setup lang="ts">
/**
 * `:show-info="false"` hides the trailing label (or inner text
 * for circles). Handy when the component sits next to its own
 * metric readout or inside a compact toolbar.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center; width: 100%; max-width: 480px">
    <div style="flex: 1; min-width: 0; max-width: 280px">
      <SgProgress :percent="62" :show-info="false" />
    </div>
    <SgProgress type="circle" :percent="62" :width="48" :stroke-width="4" :show-info="false" />
  </div>
</template>
