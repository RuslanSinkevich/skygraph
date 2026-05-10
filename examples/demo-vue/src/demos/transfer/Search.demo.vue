<script setup lang="ts">
/**
 * `show-search` adds a filter input above each list. It matches on
 * `title` (case-insensitive) — fixed in `SgTransfer`, no slot for a
 * custom filter renderer.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref<string[]>([])
</script>

<template>
  <SgTransfer v-model="targetKeys" show-search :data-source="mockData" />
</template>
