<script setup lang="ts">
/**
 * `:fullscreen="false"` swaps the roomy desktop layout for a compact
 * card — ideal as a widget inside a sidebar or a popover.
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div style="max-width: 320px">
    <SgCalendar :fullscreen="false" />
  </div>
</template>
