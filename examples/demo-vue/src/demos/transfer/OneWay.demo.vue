<script setup lang="ts">
/**
 * `one-way` hides the "move left" button — good for permission grants
 * where items can only ever be added to the target side.
 */
import { ref } from 'vue'
import { SgTransfer } from '@skygraph/vue'
import { mockData } from './data'

const targetKeys = ref<string[]>([])
</script>

<template>
  <SgTransfer v-model="targetKeys" one-way :data-source="mockData" />
</template>
