<script setup lang="ts">
/**
 * `unstyled` drops the container chrome and renders the active
 * slide as-is, plus numeric `<button>` controls. Autoplay still
 * works; build your own transition in CSS.
 */
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'
</script>

<template>
  <SgCarousel unstyled class="demo-raw-carousel-vue">
    <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
      Raw {{ i + 1 }}
    </div>
  </SgCarousel>
</template>

<style>
/* Global (not scoped) so descendants of SgCarousel.unstyled receive styling. */
.demo-raw-carousel-vue {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.demo-raw-carousel-vue > :not(:last-child) {
  border-radius: 12px;
  overflow: hidden;
}
.demo-raw-carousel-vue > div:last-child {
  display: flex;
  gap: 8px;
}
.demo-raw-carousel-vue button {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
}
.demo-raw-carousel-vue button[aria-current='true'] {
  background: #111;
  color: white;
  border-color: #111;
}
</style>
