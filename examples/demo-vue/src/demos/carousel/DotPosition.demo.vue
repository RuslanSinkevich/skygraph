<script setup lang="ts">
/**
 * Dots can dock on any edge. Left / right switch the carousel
 * to a vertical layout and rotate the dot shape to match.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
    <SgCarousel dot-position="top">
      <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
        Top {{ i + 1 }}
      </div>
    </SgCarousel>
    <SgCarousel dot-position="right">
      <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
        Right {{ i + 1 }}
      </div>
    </SgCarousel>
  </div>
</template>
