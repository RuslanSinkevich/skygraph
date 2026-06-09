<script setup lang="ts">
/**
 * Toasts render in the corner that matches `placement`. Each
 * corner needs its own `<SgNotificationContainer>` — the
 * aggregator mounts `topRight`, `topLeft`, `bottomRight`.
 */
import { SgButton, notification } from '@skygraph/vue'

type Placement = 'topLeft' | 'topRight' | 'bottomRight'
const PLACEMENTS: Placement[] = ['topLeft', 'topRight', 'bottomRight']

function fire(p: Placement) {
  notification.open({
    message: p,
    description: `Notification pinned at ${p}.`,
    placement: p,
  })
}
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton v-for="p in PLACEMENTS" :key="p" @click="fire(p)">{{ p }}</SgButton>
  </div>
</template>
