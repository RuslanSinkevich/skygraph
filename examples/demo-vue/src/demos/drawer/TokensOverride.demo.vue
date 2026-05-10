<script setup lang="ts">
/**
 * Drawer has no component-specific tokens — it composes
 * `--sg-color-bg-elevated` for the panel, `--sg-color-overlay` for
 * the mask, and `--sg-shadow-lg` for the lift.
 *
 * Vue-side delta vs React: `<SgDrawer>` teleports to `<body>`, so
 * scoping tokens on a wrapping `<div>` does NOT cascade into the
 * panel. The demo toggles a body-level class while the drawer is
 * open and pins the override tokens to that class.
 */
import { ref, watch } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

const open = ref(false)
watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('sg-drawer-tokens-dark', isOpen)
})
</script>

<template>
  <SgButton @click="open = true">Open dark drawer</SgButton>
  <SgDrawer :open="open" title="Dark theme" @close="open = false">
    <p style="color: inherit">
      Panel, mask, and shadow all follow the scoped tokens — drop the same
      body-level class higher in the tree (or set it permanently) for a
      theme-wide dark drawer.
    </p>
  </SgDrawer>
</template>

<style>
body.sg-drawer-tokens-dark .sg-drawer-root {
  --sg-color-bg-elevated: #0f172a;
  --sg-color-border-secondary: rgba(148, 163, 184, 0.15);
  --sg-color-text: #e2e8f0;
  --sg-color-text-tertiary: #94a3b8;
  --sg-color-overlay: rgba(2, 6, 23, 0.7);
  --sg-shadow-lg: 0 18px 40px rgba(2, 6, 23, 0.5);
}
</style>
