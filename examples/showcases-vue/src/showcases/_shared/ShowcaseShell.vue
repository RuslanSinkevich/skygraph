<script setup lang="ts">
import { SgNotificationContainer } from '@skygraph/vue'

/**
 * Shared shell: notification host + optional header + body slot.
 * Use the body slot to render either `<SgTabs>` (with its own panel slot)
 * or any full-width layout.
 */
const props = withDefaults(
  defineProps<{
    noPadding?: boolean
  }>(),
  { noPadding: false },
)
</script>

<template>
  <div :class="props.noPadding ? 'sc-content sc-content-flush' : 'sc-content'" style="flex: 1">
    <SgNotificationContainer />
    <slot name="header" />
    <slot />
  </div>
</template>
