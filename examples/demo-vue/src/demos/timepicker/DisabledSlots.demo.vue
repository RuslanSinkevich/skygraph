<script setup lang="ts">
/**
 * `disabledHours` / `disabledMinutes` grey out specific slots — ideal
 * for business hours. The callbacks get the currently-picked hour so
 * you can vary the minute restrictions per hour if you need to.
 */
import { SgTimePicker } from '@skygraph/vue'

function disabledHours() {
  return [...Array(8).keys(), 18, 19, 20, 21, 22, 23]
}

function disabledMinutes() {
  return [5, 10, 15, 20, 25, 35, 40, 45, 50, 55]
}
</script>

<template>
  <SgTimePicker
    default-value="09:30"
    format="HH:mm"
    :show-second="false"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    placeholder="Business hours only"
  />
</template>
