<script setup lang="ts">
/**
 * Calendar has no component-scoped tokens — it is driven by the global
 * palette. Override them on a scoped wrapper to re-skin a single
 * instance (e.g. a "holiday" view).
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div
    :style="{
      '--sg-color-primary': 'var(--sg-green-6)',
      '--sg-color-primary-bg': 'var(--sg-green-1)',
      '--sg-border-radius-lg': '16px',
      '--sg-border-radius-sm': '999px',
      maxWidth: '480px',
    }"
  >
    <SgCalendar />
  </div>
</template>
