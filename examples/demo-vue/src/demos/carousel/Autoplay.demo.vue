<script setup lang="ts">
/**
 * `autoplay` advances every `autoplaySpeed` ms (default 3000).
 * The timer pauses while the tab is inactive — it's a plain
 * `setInterval`, so don't rely on it for exact cadence.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
</script>

<template>
  <SgCarousel autoplay :autoplay-speed="2500">
    <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
      Auto {{ i + 1 }}
    </div>
  </SgCarousel>
</template>
