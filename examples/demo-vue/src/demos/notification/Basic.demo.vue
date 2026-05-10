<script setup lang="ts">
/**
 * Simplest usage — title + description, auto-closes after 4.5s.
 * The aggregator mounts a `SgNotificationContainer` per corner,
 * so this fire-and-forget call is enough.
 */
import { SgButton, notification } from '@skygraph/vue'

function fire() {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification.',
  })
}
</script>

<template>
  <SgButton @click="fire">Open notification</SgButton>
</template>
