<script setup lang="ts">
/**
 * `:dots="false"` hides the indicator strip — use it when the
 * carousel is decorative (background hero) and users don't
 * need explicit navigation.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
</script>

<template>
  <SgCarousel :dots="false" autoplay>
    <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
      Clean {{ i + 1 }}
    </div>
  </SgCarousel>
</template>
