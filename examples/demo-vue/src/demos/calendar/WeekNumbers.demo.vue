<script setup lang="ts">
/**
 * `show-week-numbers` adds an ISO week column. Combine with
 * `week-start-day="1"` for a Monday-first ISO calendar.
 */
import { SgCalendar } from '@skygraph/vue'
</script>

<template>
  <div style="max-width: 480px">
    <SgCalendar show-week-numbers :week-start-day="1" />
  </div>
</template>
