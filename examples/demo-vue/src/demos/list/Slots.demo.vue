<script setup lang="ts">
/**
 * `classNames` + `styles` target stable DOM slots
 * (root / header / footer / items / item / empty / pagination)
 * without writing deep descendant selectors.
 */
import { SgList } from '@skygraph/vue'
import { shortData } from './data'
</script>

<template>
  <SgList
    bordered
    :data-source="shortData"
    header="Header (themed via slots)"
    footer="Footer"
    :class-names="{
      root: 'demo-list-root',
      header: 'demo-list-header',
      item: 'demo-list-item',
    }"
    :styles="{
      header: { fontWeight: '700' },
      item: { borderRadius: '10px' },
    }"
  >
    <template #default="{ item, index }">
      <div style="padding: 8px 0">{{ index + 1 }}. {{ item }}</div>
    </template>
  </SgList>
</template>

<style>
.demo-list-root {
  border-color: #c4b5fd;
}
.demo-list-header {
  background: #ede9fe;
  color: #4c1d95;
}
.demo-list-item {
  transition: transform 160ms ease;
}
.demo-list-item:hover {
  transform: translateX(4px);
}
</style>
