<script setup lang="ts">
/**
 * Pagination piggybacks on the global `--sg-color-primary` for the
 * active chip, so a single token swap rebrands the whole pager.
 * Cranking `--sg-border-radius` to 999px makes it pill-shaped.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(2)
function onChange(p: number) {
  page.value = p
}
</script>

<template>
  <div
    :style="{
      '--sg-color-primary': '#ff6b6b',
      '--sg-color-primary-hover': '#ff8787',
      '--sg-border-radius': '999px',
    } as Record<string, string>"
  >
    <SgPagination :current="page" :total="50" @change="onChange" />
  </div>
</template>
