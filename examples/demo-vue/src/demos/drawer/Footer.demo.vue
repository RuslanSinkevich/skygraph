<script setup lang="ts">
/**
 * The `#footer` slot renders a sticky region under the scrolling
 * body — the body has `flex: 1`, so long forms scroll while the
 * actions stay pinned.
 */
import { ref } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

const open = ref(false)
const rows = Array.from({ length: 8 }, (_, i) => i + 1)
function close() {
  open.value = false
}
</script>

<template>
  <SgButton @click="open = true">Edit record</SgButton>
  <SgDrawer :open="open" title="Edit record" @close="close">
    <p v-for="i in rows" :key="i">
      Form row {{ i }} — scroll the body while the footer stays pinned.
    </p>
    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end">
        <SgButton @click="close">Cancel</SgButton>
        <SgButton type="primary" @click="close">Save</SgButton>
      </div>
    </template>
  </SgDrawer>
</template>
