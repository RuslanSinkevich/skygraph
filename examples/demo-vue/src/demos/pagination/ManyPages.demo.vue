<script setup lang="ts">
/**
 * For totals > 7 pages, the pager renders first + current neighbours
 * + last with `…` placeholders between them — the ellipsis is purely
 * visual (non-clickable) to avoid ambiguous jump targets.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(25)
function onChange(p: number) {
  page.value = p
}
</script>

<template>
  <SgPagination :current="page" :total="500" @change="onChange" />
</template>
