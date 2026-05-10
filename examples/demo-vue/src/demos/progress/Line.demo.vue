<script setup lang="ts">
/**
 * A standard horizontal bar with a trailing percentage label.
 * At 100% the `status` defaults to `success` so the bar flips
 * to green without extra logic.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <SgProgress :percent="30" />
    <SgProgress :percent="50" status="active" />
    <SgProgress :percent="70" status="error" />
    <SgProgress :percent="100" />
  </div>
</template>
