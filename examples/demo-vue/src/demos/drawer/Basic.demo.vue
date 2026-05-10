<script setup lang="ts">
/**
 * Simplest Drawer. The component is always mounted — toggle `open`
 * to slide in. ESC and clicking the mask emit `@close`; the focus
 * is trapped inside the panel while it's visible.
 */
import { ref } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

const open = ref(false)
</script>

<template>
  <SgButton type="primary" @click="open = true">Open Drawer</SgButton>
  <SgDrawer :open="open" title="Basic Drawer" @close="open = false">
    <p>Some supplementary content lives here.</p>
    <p>Close with ESC, the × button, or by clicking the mask.</p>
  </SgDrawer>
</template>
