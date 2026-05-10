<script setup lang="ts">
/**
 * Customize the two column headers in a single tuple — use it to give
 * the lists a domain name ("Available / Selected", "Inactive / Active",
 * ...).
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref<string[]>(['2', '4'])
</script>

<template>
  <SgTransfer
    v-model="targetKeys"
    :titles="['Available', 'Selected']"
    :data-source="mockData"
  />
</template>
