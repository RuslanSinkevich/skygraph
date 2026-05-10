<script setup lang="ts">
/**
 * `disabled` dims the whole control and blocks both pointer and
 * keyboard interaction. ARIA stays correct (`aria-disabled`).
 */
import { SgSlider } from '@skygraph/vue'
</script>

<template>
  <div style="display: grid; gap: 16px; max-width: 360px">
    <SgSlider disabled :default-value="30" />
    <SgSlider disabled :default-value="70" />
  </div>
</template>
