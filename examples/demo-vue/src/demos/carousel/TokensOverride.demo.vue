<script setup lang="ts">
// Wrap the component in an element that sets a few `--sg-*` CSS variables —
// everything inside repaints. No props, no providers.
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'

const dark = {
  width: '100%',
  background: '#0f172a',
  '--sg-color-text-tertiary': '#94a3b8',
  padding: '24px',
  borderRadius: '12px',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-text-disabled': '#64748b',
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
