<script setup lang="ts">
/**
 * `effect="fade"` crossfades slides via opacity instead of
 * translating the track. Better for hero blocks where
 * horizontal motion would feel jarring.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
</script>

<template>
  <SgCarousel effect="fade" autoplay>
    <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
      Fade {{ i + 1 }}
    </div>
  </SgCarousel>
</template>
