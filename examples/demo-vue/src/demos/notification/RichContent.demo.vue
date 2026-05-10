<script setup lang="ts">
/**
 * Vue-side limitation: `message` and `description` accept only
 * strings in `@skygraph/vue`. Where React can mount React nodes
 * (icons, links, progress bars) directly, the Vue store flattens
 * to plain text. Compose richer cards by lifting the content out
 * of the store and rendering it next to the toast in your own
 * subtree, or rely on locale to format the strings.
 */
import { SgButton, notification } from '@skygraph/vue'

function fire() {
  notification.open({
    type: 'info',
    duration: 0,
    message: '🚀 New release available',
    description:
      'Version 2.4.0 — performance wins + a new token system. Open the changelog for the full breakdown.',
  })
}
</script>

<template>
  <SgButton @click="fire">Open rich-text toast</SgButton>
</template>
