<script setup lang="ts">
/**
 * `width` accepts a number (pixels) or any CSS length. Use `'90vw'`
 * to build a responsive fullscreen-ish dialog.
 */
import { ref } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const narrow = ref(false)
const wide = ref(false)
const full = ref(false)
</script>

<template>
  <SgButton @click="narrow = true">360 px</SgButton>
  <SgButton @click="wide = true">720 px</SgButton>
  <SgButton @click="full = true">90 vw</SgButton>

  <SgModal :open="narrow" title="Narrow" :width="360" @close="narrow = false">
    <p>Small dialog for short confirmations.</p>
  </SgModal>
  <SgModal :open="wide" title="Wide" :width="720" @close="wide = false">
    <p>Use wider modals for dense forms, tables, or side-by-side layouts.</p>
  </SgModal>
  <SgModal :open="full" title="Responsive" width="90vw" @close="full = false">
    <p>CSS lengths work too — <code>90vw</code>, <code>min(720px, 90vw)</code>, etc.</p>
  </SgModal>
</template>
