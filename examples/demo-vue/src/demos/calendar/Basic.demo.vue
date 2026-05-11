<script setup lang="ts">
/**
 * Default month grid, uncontrolled. Header shows month/year selects and
 * prev/next nav arrows; mode-switch toggles between month and year views.
 * Clicking a day selects it; the "Today" button in the footer resets the
 * selection to today.
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div style="max-width: 480px">
    <SgCalendar />
  </div>
</template>
