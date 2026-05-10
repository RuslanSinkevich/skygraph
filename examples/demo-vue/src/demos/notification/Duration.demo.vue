<script setup lang="ts">
/**
 * Set `duration` in ms; pass `0` to disable auto-close so the
 * user must use the × button to dismiss.
 */
import { SgButton, notification } from '@skygraph/vue'

function fireShort() {
  notification.open({
    message: 'Quick toast',
    description: 'Closes after 1.5s.',
    duration: 1500,
  })
}

function firePersistent() {
  notification.open({
    message: 'Persistent',
    description: 'This notification will not close automatically. Use the × button.',
    duration: 0,
  })
}
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton @click="fireShort">Short (1.5s)</SgButton>
    <SgButton @click="firePersistent">No auto-close (duration: 0)</SgButton>
  </div>
</template>
