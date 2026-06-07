<script setup lang="ts">
import { SgProgress } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 400px">
    <SgProgress unstyled :percent="45" stroke-color="#0ea5e9" />
    <SgProgress unstyled :percent="90" stroke-color="#22c55e" :stroke-width="12" />
  </div>
</template>
