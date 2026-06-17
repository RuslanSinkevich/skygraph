<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgDropdown, SgButton, type DropdownItem } from '@skygraph/vue'

const items: DropdownItem[] = [
  { key: '1', label: 'Edit' },
  { key: '2', label: 'Duplicate' },
  { key: 'd1', label: '', divider: true },
  { key: '3', label: 'Delete…', danger: true },
]

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text': '#e2e8f0',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-error': '#f87171',
}
</script>

<template>
  <div :style="dark">
    <SgDropdown :items="items" trigger="click">
      <SgButton>Actions ▾</SgButton>
    </SgDropdown>
  </div>
</template>
