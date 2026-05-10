<script setup lang="ts">
/**
 * Controlled via `v-model` (alias `target-keys`) — the list is split
 * between source (left) and target (right) based on which keys are
 * currently in the target.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref<string[]>(['1', '3', '5'])
</script>

<template>
  <SgTransfer v-model="targetKeys" :data-source="mockData" />
</template>
