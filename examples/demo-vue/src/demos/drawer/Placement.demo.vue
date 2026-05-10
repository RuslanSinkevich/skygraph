<script setup lang="ts">
/**
 * Horizontal placements (`left` / `right`) use `width`; vertical
 * placements (`top` / `bottom`) use `height`. The slide direction
 * matches the edge automatically.
 */
import { ref } from 'vue'
import { SgButton, SgDrawer } from '@skygraph/vue'

type Placement = 'left' | 'right' | 'top' | 'bottom'
const PLACEMENTS: Placement[] = ['left', 'right', 'top', 'bottom']

const open = ref(false)
const placement = ref<Placement>('right')

function pick(p: Placement) {
  placement.value = p
  open.value = true
}
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgButton v-for="p in PLACEMENTS" :key="p" @click="pick(p)">{{ p }}</SgButton>
  </div>
  <SgDrawer
    :open="open"
    :title="`${placement} Drawer`"
    :placement="placement"
    @close="open = false"
  >
    <p>Sliding in from the <b>{{ placement }}</b>.</p>
  </SgDrawer>
</template>
