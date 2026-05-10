<script setup lang="ts">
/**
 * `avatar` prepends a round placeholder — matches the classic
 * profile card / feed item shape. Pass an object for `size` and
 * `shape` tuning.
 */
import { SgSkeleton } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgSkeleton avatar active />
    <SgSkeleton active :avatar="{ shape: 'square', size: 64 }" />
    <SgSkeleton
      active
      :avatar="{ shape: 'circle', size: 56 }"
      :title="{ width: 180 }"
      :paragraph="{ rows: 2 }"
    />
  </div>
</template>
