<script setup lang="ts">
/**
 * `unstyled` strips the wrapper class hooks; semantics (`<ul>` lists,
 * `<input type="checkbox">`, paged buttons) stay intact for assistive
 * tech and consumer-side styling.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref<string[]>(['0', '2'])
</script>

<template>
  <SgTransfer v-model="targetKeys" unstyled :data-source="mockData" />
</template>
