<script setup lang="ts">
/**
 * Turn off the mask for "lightweight" side panels that don't take
 * focus away from the rest of the page — e.g. a persistent filter
 * palette. `:mask-closable="false"` keeps the mask but forces the
 * user to use the close button.
 */
import { computed, ref } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

type Mode = 'no-mask' | 'sticky'
const mode = ref<Mode | null>(null)
const noMaskOpen = computed(() => mode.value === 'no-mask')
const stickyOpen = computed(() => mode.value === 'sticky')
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton @click="mode = 'no-mask'">Open without mask</SgButton>
    <SgButton @click="mode = 'sticky'">Mask, but not closable</SgButton>
  </div>
  <SgDrawer
    :open="noMaskOpen"
    title="No mask"
    :mask="false"
    :width="320"
    @close="mode = null"
  >
    <p>The background stays interactive.</p>
  </SgDrawer>
  <SgDrawer
    :open="stickyOpen"
    title="Mask but not closable"
    :mask-closable="false"
    :width="320"
    @close="mode = null"
  >
    <p>Mask is dim, clicks on it do nothing — use the × or ESC.</p>
  </SgDrawer>
</template>
