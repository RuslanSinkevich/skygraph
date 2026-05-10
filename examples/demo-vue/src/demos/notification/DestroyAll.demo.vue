<script setup lang="ts">
/**
 * `notification.destroy()` clears the entire store regardless of
 * placement. Use it when navigating away from a flow that may
 * have queued a stack of stale toasts.
 */
import { SgButton, notification } from '@skygraph/vue'

function fireBatch() {
  notification.info('Batch 1', 'First toast')
  notification.success('Batch 2', 'Second toast')
  notification.warning('Batch 3', 'Third toast')
}
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton @click="fireBatch">Fire 3 toasts</SgButton>
    <SgButton @click="notification.destroy()">Destroy all</SgButton>
  </div>
</template>
