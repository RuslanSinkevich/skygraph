<script setup lang="ts">
/**
 * Milder outcomes — `info` for neutral confirmations, `warning`
 * for attention-needed states. Both share the Result layout with
 * different icons and colour tokens.
 */
import { SgResult } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgResult status="info" title="Your operation has been executed" />
    <SgResult status="warning" title="There are some problems with your operation" />
  </div>
</template>
