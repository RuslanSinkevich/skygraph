<script setup lang="ts">
/**
 * `unstyled` keeps the accessibility tree (table, grid, buttons) but
 * drops the SkyGraph wrapper class. Perfect when embedding inside a
 * custom design system.
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div style="max-width: 480px">
    <SgCalendar unstyled />
  </div>
</template>
