<script setup lang="ts">
import { SgSegmented } from '@skygraph/vue'

const options = [
  { label: 'Map', value: 'Map' },
  { label: 'Transit', value: 'Transit' },
  { label: 'Satellite', value: 'Satellite' },
]
</script>

<template>
  <SgSegmented unstyled class="demo-radio-group" default-value="Map" :options="options" />
</template>

<style scoped>
.demo-radio-group {
  display: inline-flex;
  gap: 16px;
}

.demo-radio-group :deep(label) {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.demo-radio-group :deep(input[disabled] + *) {
  opacity: 0.4;
}
</style>
