<script setup lang="ts">
/**
 * `unstyled` drops all SkyGraph classes and renders a minimal
 * `role="progressbar"` wrapper with bare inline track + fill.
 * Use the raw props + your own CSS to reach any design target.
 */
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px">
    <SgProgress unstyled :percent="45" stroke-color="#0ea5e9" />
    <SgProgress unstyled :percent="90" stroke-color="#22c55e" :stroke-width="12" />
  </div>
</template>
