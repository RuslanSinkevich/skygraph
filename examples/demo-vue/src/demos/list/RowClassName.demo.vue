<script setup lang="ts">
/**
 * `rowClassName` accepts either a static string or a function
 * `(item, index) => string`. Use it to highlight pinned, featured or
 * unread rows without touching the default slot.
 */
import { SgList, SgTag } from '@skygraph/vue'
import { tasks, type Task } from './data'
</script>

<template>
  <SgList
    bordered
    :data-source="tasks"
    :row-class-name="(t: Task) => (t.pinned ? 'demo-list-row-featured' : '')"
  >
    <template #default="{ item }">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
        <span>{{ item.title }}</span>
        <SgTag v-if="item.pinned" color="processing">pinned</SgTag>
      </div>
    </template>
  </SgList>
</template>

<style>
.demo-list-row-featured {
  background: var(--sg-color-primary-bg);
}
</style>
