<script setup lang="ts">
/**
 * Set `footer="none"` (or omit `okHandler` and the `#footer` slot)
 * to drop the footer area entirely — useful for purely informational
 * modals (previews, images, detail panes).
 */
import { ref } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const open = ref(false)
</script>

<template>
  <SgButton @click="open = true">Show details</SgButton>
  <SgModal :open="open" title="Release 1.4.0" footer="none" @close="open = false">
    <ul style="margin: 4px 0 0 18px; line-height: 1.7">
      <li>Table now exposes <code>--sg-table-cell-solid-bg</code></li>
      <li>DatePicker accepts <code>DatePreset[]</code> for sidebar shortcuts</li>
      <li>FormList gains a <code>move()</code> action</li>
    </ul>
  </SgModal>
</template>
