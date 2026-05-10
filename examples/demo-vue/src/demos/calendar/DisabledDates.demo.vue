<script setup lang="ts">
/**
 * `disabled-date` returns `true` for non-interactive cells. Classic
 * case: gray out weekends + past days for booking flows.
 */
import { SgCalendar } from '@skygraph/vue'

const today = new Date()
today.setHours(0, 0, 0, 0)

function disabledDate(d: Date) {
  return d < today || d.getDay() === 0 || d.getDay() === 6
}
</script>

<template>
  <div style="max-width: 480px">
    <SgCalendar :disabled-date="disabledDate" />
  </div>
</template>
