<script setup lang="ts">
import { ref, watch } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

const open = ref(false)
watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('demo-unstyled-drawer-host', isOpen)
})
</script>

<template>
  <SgButton @click="open = true">Open unstyled</SgButton>
  <SgDrawer unstyled :open="open" title="Unstyled" @close="open = false">
    <p>Behaviour + a11y stay, painting is yours.</p>
  </SgDrawer>
</template>

<style>
body.demo-unstyled-drawer-host > [role='dialog'] {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  padding: 24px;
  background: #fff;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
