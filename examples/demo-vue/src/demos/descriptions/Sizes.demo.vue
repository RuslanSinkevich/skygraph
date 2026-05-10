<script setup lang="ts">
/**
 * Two visual sizes — `small` (compact padding, `--sg-font-size-sm`)
 * and default. `middle` / `large` share the default preset.
 */
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <SgDescriptions size="small" bordered title="Small" :items="userItems" />
    <SgDescriptions size="middle" bordered title="Middle" :items="userItems" />
  </div>
</template>
