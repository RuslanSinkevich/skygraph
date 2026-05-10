<script setup lang="ts">
/**
 * `unstyled` strips SkyGraph's styles but keeps all semantics:
 * `role="dialog"`, focus trap, `Escape` handling. Bring your own
 * visuals via a body-level class (the modal still teleports to
 * `<body>`).
 */
import { ref, watch } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const open = ref(false)

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('demo-unstyled-dialog-host', isOpen)
})
</script>

<template>
  <SgButton @click="open = true">Open headless dialog</SgButton>
  <SgModal unstyled :open="open" title="Headless" @close="open = false">
    <div style="padding: 16px">
      <p style="margin-top: 0">
        No SkyGraph styles. Backdrop, centering, radii, colors are all yours
        via a body-level class.
      </p>
      <SgButton @click="open = false">Close</SgButton>
    </div>
  </SgModal>
</template>

<style>
body.demo-unstyled-dialog-host > [role='dialog'] {
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(420px, 90vw);
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  z-index: 1000;
}

body.demo-unstyled-dialog-host > [role='dialog']::before {
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  z-index: -1;
}
</style>
