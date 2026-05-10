<script setup lang="ts">
/**
 * Each direct child becomes a slide. Default transition is a
 * horizontal slide, dots sit at the bottom. No autoplay until
 * you ask for it.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
</script>

<template>
  <SgCarousel>
    <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
      Slide {{ i + 1 }}
    </div>
  </SgCarousel>
</template>
