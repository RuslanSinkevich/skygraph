<script setup lang="ts">
/**
 * Default month grid, uncontrolled. Header shows month/year title with
 * prev/next nav arrows; clicking a day selects it.
 *
 * Vue delta: `SgCalendar` has no `fullscreen` toggle (always renders the
 * same compact-style table). See `findings/T-Vue-Demo-Forms.md` →
 * `calendar-vue-feature-gaps`.
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div style="max-width: 480px">
    <SgCalendar />
  </div>
</template>
