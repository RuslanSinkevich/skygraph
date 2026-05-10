<script setup lang="ts">
/**
 * `simple` drops the numbered buttons for a compact "page / total"
 * counter flanked by prev / next. Great fit for toolbars that already
 * have a "show total" label nearby.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(3)
function onChange(p: number) {
  page.value = p
}
</script>

<template>
  <SgPagination simple :current="page" :total="50" @change="onChange" />
</template>
