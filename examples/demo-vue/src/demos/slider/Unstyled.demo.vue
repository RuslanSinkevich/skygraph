<script setup lang="ts">
/**
 * `unstyled` drops SkyGraph classes. The DOM structure (track, fill,
 * handle) stays so you can target it yourself, and `role="slider"`
 * remains on the thumb.
 */
import { SgSlider } from '@skygraph/vue'
</script>

<template>
  <div
    style="
      max-width: 360px;
      padding: 12px;
      border: 1px dashed var(--sg-color-border);
      border-radius: 8px;
    "
  >
    <SgSlider unstyled :default-value="35" />
  </div>
</template>
