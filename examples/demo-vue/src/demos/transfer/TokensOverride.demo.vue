<script setup lang="ts">
/**
 * Transfer has no component-local tokens. Rebrand via the global
 * palette: border / header / hover / selected rely on
 * `--sg-color-border`, `--sg-color-bg-secondary`, `--sg-color-bg-hover`,
 * `--sg-color-primary-bg`.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref<string[]>(['1', '3'])
</script>

<template>
  <div
    :style="{
      '--sg-color-border': '#cbd5e1',
      '--sg-color-border-secondary': '#e2e8f0',
      '--sg-color-bg-secondary': '#f1f5f9',
      '--sg-color-bg-hover': '#e0f2fe',
      '--sg-color-primary-bg': '#bae6fd',
      '--sg-border-radius': '10px',
    }"
  >
    <SgTransfer v-model="targetKeys" :data-source="mockData" show-search />
  </div>
</template>
