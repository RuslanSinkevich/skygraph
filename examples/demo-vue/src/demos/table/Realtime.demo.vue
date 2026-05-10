<script setup lang="ts">
/**
 * Reactive data — the `data` prop is watched, so simply mutating the
 * array is enough to trigger a refresh. Here we update a `progress`
 * field every 800 ms.
 */
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { SgTable, type TableColumn } from '@skygraph/vue'
import { makeUserRows } from './_data'

const data = ref(makeUserRows(8))

const columns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Job', sortable: true },
  { key: 'team', title: 'Team' },
  { key: 'progress', title: 'Progress %', align: 'right' },
])

let id: number | undefined
onMounted(() => {
  id = window.setInterval(() => {
    data.value = data.value.map((r) => ({
      ...r,
      data: {
        ...r.data,
        progress: Math.min(100, Number(r.data.progress) + Math.floor(Math.random() * 7)),
      },
    }))
  }, 800)
})
onUnmounted(() => {
  if (id !== undefined) window.clearInterval(id)
})
</script>

<template>
  <SgTable :columns="columns" :data="data" />
</template>
