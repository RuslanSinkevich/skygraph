<script setup lang="ts">
/**
 * `#icon` slot replaces the preset artwork — emoji, SVG, or any
 * component all work. The `status` still decides the colour for
 * the default icon path, but if you render your own node you
 * control the tint.
 */
import { SgResult } from '@skygraph/vue'
</script>

<template>
  <SgResult
    status="info"
    title="Deploy started"
    sub-title="Build #1242 is running, ETA 2 min"
  >
    <template #icon>
      <span style="font-size: 64px">🚀</span>
    </template>
  </SgResult>
</template>
