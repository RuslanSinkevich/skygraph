<script setup lang="ts">
/**
 * Two visual sizes — `small` uses a 24-px icon ring and smaller
 * fonts; anything else (`middle` / `large`) falls back to the
 * 32-px `default` preset.
 */
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgSteps size="small" :current="1" :items="basicSteps" />
    <SgSteps :current="1" :items="basicSteps" />
  </div>
</template>
