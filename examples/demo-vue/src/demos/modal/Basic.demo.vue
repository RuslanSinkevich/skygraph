<script setup lang="ts">
/**
 * Minimal dialog — title, body, two footer buttons supplied via the
 * `#footer` slot. Vue's `<Teleport>` mounts the dialog onto `body`,
 * mirroring React's `createPortal` (same `sg-modal-mask` DOM).
 */
import { ref } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const open = ref(false)
function show() {
  open.value = true
}
function hide() {
  open.value = false
}
</script>

<template>
  <SgButton type="primary" @click="show">Open modal</SgButton>
  <SgModal :open="open" title="Create project" @close="hide">
    <p>
      Press <kbd>Esc</kbd>, click the mask, or use the close button to dismiss.
    </p>
    <template #footer>
      <SgButton @click="hide">Cancel</SgButton>
      <SgButton type="primary" @click="hide">Create</SgButton>
    </template>
  </SgModal>
</template>
