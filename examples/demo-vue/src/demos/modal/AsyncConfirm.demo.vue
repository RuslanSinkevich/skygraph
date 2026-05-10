<script setup lang="ts">
/**
 * Keep the modal open while an async task runs; close it on success.
 * While saving, show `loading` on the primary button AND disable
 * Cancel so the user can't leave the dialog in a half-state.
 */
import { ref } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const open = ref(false)
const saving = ref(false)

function show() {
  open.value = true
}

function tryClose() {
  if (!saving.value) open.value = false
}

async function handleSave() {
  saving.value = true
  await new Promise((r) => setTimeout(r, 1400))
  saving.value = false
  open.value = false
}
</script>

<template>
  <SgButton @click="show">Save…</SgButton>
  <SgModal :open="open" title="Save changes" @close="tryClose">
    <p>Simulated save — takes ~1.4s. While saving, Cancel is disabled.</p>
    <template #footer>
      <SgButton :disabled="saving" @click="tryClose">Cancel</SgButton>
      <SgButton type="primary" :loading="saving" @click="handleSave">
        {{ saving ? 'Saving…' : 'Save' }}
      </SgButton>
    </template>
  </SgModal>
</template>
