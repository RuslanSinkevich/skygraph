<script setup lang="ts">
/**
 * Classic pager: ‹ numbered buttons › with ellipsis folding once the
 * total exceeds seven pages. Clamping is done inside the component
 * so passing invalid `current` values won't crash.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(1)
function onChange(p: number) {
  page.value = p
}
</script>

<template>
  <SgPagination :current="page" :total="50" @change="onChange" />
</template>
