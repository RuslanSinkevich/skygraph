<script setup lang="ts">
/**
 * Rebrand by scoping `--sg-color-bg-secondary` (label column
 * background), `--sg-color-border-secondary` (dividers) and
 * `--sg-border-radius` (outer corners).
 */
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'

const scope = {
  padding: '12px',
  '--sg-color-bg-secondary': '#ede9fe',
  '--sg-color-border-secondary': '#c4b5fd',
  '--sg-color-text-secondary': '#5b21b6',
  '--sg-border-radius': '12px',
} as Record<string, string>
</script>

<template>
  <div :style="scope">
    <SgDescriptions bordered title="Rebranded" :items="userItems" />
  </div>
</template>
