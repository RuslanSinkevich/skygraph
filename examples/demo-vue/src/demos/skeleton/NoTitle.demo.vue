<script setup lang="ts">
/**
 * Drop pieces you don't need. `:title="false"` hides the heading
 * bar, `:paragraph="false"` hides the lines, omitting `avatar`
 * hides the round placeholder. Great for ad-hoc shapes.
 */
import { SgSkeleton } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <SgSkeleton active :title="false" :paragraph="{ rows: 2 }" />
    <SgSkeleton active :paragraph="false" :title="{ width: 240 }" />
    <SgSkeleton active avatar :title="false" :paragraph="{ rows: 1 }" />
  </div>
</template>
