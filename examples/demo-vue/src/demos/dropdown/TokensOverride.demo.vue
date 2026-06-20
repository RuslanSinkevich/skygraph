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
  '--sg-color-error-bg': 'rgba(248, 113, 113, 0.16)',
  '--sg-color-text-disabled': '#64748b',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-bg-elevated': '#1e293b',
  '--sg-color-text': '#f8fafc',
  '--sg-color-bg-hover': '#334155',
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
