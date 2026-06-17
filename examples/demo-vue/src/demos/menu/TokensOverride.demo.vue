<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.22)',
}
</script>

<template>
  <div :style="dark">
    <SgMenu
      mode="inline"
      :items="sidebarItems"
      :default-open-keys="['team']"
      :default-selected-keys="['members']"
    />
  </div>
</template>
