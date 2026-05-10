<script setup lang="ts">
/**
 * `week-start-day="1"` rotates the columns so the week starts on
 * Monday — typical layout in the EU.
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div style="max-width: 480px">
    <SgCalendar :week-start-day="1" />
  </div>
</template>
