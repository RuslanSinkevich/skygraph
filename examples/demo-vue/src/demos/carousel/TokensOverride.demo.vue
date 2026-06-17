<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'

const dark = {
  background: '#0f172a',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text-disabled': '#475569',
}
</script>

<template>
  <div :style="dark">
    <SgCarousel>
      <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
        {{ i + 1 }}
      </div>
    </SgCarousel>
  </div>
</template>
