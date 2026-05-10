<script setup lang="ts">
/**
 * `draggable` adds a ⠿ handle and native HTML5 DnD. Vue emits
 * `@reorder(fromIndex, toIndex)` — own the reorder logic
 * (immutable, optimistic, server-driven).
 */
import { ref } from 'vue'
import { SgList } from '@skygraph/vue'

const items = ref(['Alpha', 'Beta', 'Gamma', 'Delta'])

function onReorder(from: number, to: number) {
  const next = [...items.value]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  items.value = next
}
</script>

<template>
  <SgList bordered draggable :data-source="items" @reorder="onReorder">
    <template #default="{ item }">{{ item }}</template>
  </SgList>
</template>
