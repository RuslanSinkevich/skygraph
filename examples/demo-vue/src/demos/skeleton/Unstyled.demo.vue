<script setup lang="ts">
/**
 * `unstyled` keeps the `aria-busy="true"` wrapper and the same
 * block order but drops all classes — bring your own skeleton
 * style. Widths / heights are still computed so the layout is
 * consistent.
 */
import { SgSkeleton } from '@skygraph/vue'
</script>

<template>
  <SgSkeleton
    unstyled
    class="demo-raw-skeleton-vue"
    avatar
    :paragraph="{ rows: 3 }"
  />
</template>

<style>
.demo-raw-skeleton-vue {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #eef2ff;
  border-radius: 10px;
  font-family: monospace;
  font-size: 13px;
}
.demo-raw-skeleton-vue > div:first-child {
  border-radius: 50%;
  background: #c7d2fe;
}
.demo-raw-skeleton-vue > div:last-child {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.demo-raw-skeleton-vue > div:last-child > div {
  background: #c7d2fe;
  border-radius: 4px;
}
</style>
