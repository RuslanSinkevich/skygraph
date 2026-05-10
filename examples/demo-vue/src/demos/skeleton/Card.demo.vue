<script setup lang="ts">
/**
 * Compose multiple Skeletons to mirror the final card / list
 * layout. The closer the shape, the less the layout will jump
 * when the real content arrives.
 */
import { SgSkeleton } from '@skygraph/vue'
</script>

<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    "
  >
    <div
      v-for="i in 3"
      :key="i"
      style="
        padding: 16px;
        border: 1px solid var(--sg-color-border);
        border-radius: var(--sg-border-radius);
        background: var(--sg-color-bg-container);
      "
    >
      <SgSkeleton active avatar :paragraph="{ rows: 3 }" />
    </div>
  </div>
</template>
