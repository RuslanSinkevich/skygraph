<script setup lang="ts">
/**
 * Vue-side delta vs React: `<SgModal>` mounts into `<body>` via
 * `<Teleport>` (parity with React's `createPortal`). CSS variables
 * defined on a wrapping `<div>` therefore do NOT cascade into the
 * teleported dialog.
 *
 * The demo works around this by toggling a body-level class while
 * the modal is open and pinning the override tokens to that class.
 * The class is added on `open=true` and removed on close, so the
 * tokens stay scoped to this one modal.
 */
import { ref, watch } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const open = ref(false)

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('sg-modal-tokens-purple', isOpen)
})
</script>

<template>
  <SgButton type="primary" class="purple-trigger" @click="open = true">
    Open purple modal
  </SgButton>
  <SgModal :open="open" title="Scoped tokens" @close="open = false">
    <p>
      Inside this modal, <code>--sg-color-primary</code> is purple and the
      dialog radius is 14px. The rest of the app stays blue once the modal
      closes.
    </p>
    <template #footer>
      <SgButton @click="open = false">Cancel</SgButton>
      <SgButton type="primary" @click="open = false">Confirm</SgButton>
    </template>
  </SgModal>
</template>

<style>
.purple-trigger {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: #f3e8ff;
}

body.sg-modal-tokens-purple .sg-modal-mask {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: #f3e8ff;
  --sg-border-radius-lg: 14px;
}
</style>
