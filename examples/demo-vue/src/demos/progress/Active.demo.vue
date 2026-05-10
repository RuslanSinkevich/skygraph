<script setup lang="ts">
/**
 * `status="active"` turns on a shimmering highlight that sweeps
 * across the filled region. Use it for indeterminate-feeling
 * uploads or long syncs where you still know the percentage.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <SgProgress :percent="20" status="active" />
    <SgProgress :percent="55" status="active" />
    <SgProgress :percent="85" status="active" />
  </div>
</template>
