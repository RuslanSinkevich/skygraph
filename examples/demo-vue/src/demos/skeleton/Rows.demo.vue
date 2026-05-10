<script setup lang="ts">
/**
 * Control the paragraph block with `{ rows, width }`. Match the
 * expected content size — too few lines feel off when the real
 * paragraph is a wall of text, too many look spammy.
 */
import { SgSkeleton } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgSkeleton active :paragraph="{ rows: 2 }" />
    <SgSkeleton active :paragraph="{ rows: 5 }" />
    <SgSkeleton
      active
      :paragraph="{ rows: 4, width: ['100%', '90%', '80%', '40%'] }"
    />
  </div>
</template>
