<script setup lang="ts">
import { SgInputNumber } from '@skygraph/vue'
</script>

<template>
  <SgInputNumber
    unstyled
    :default-value="10"
    :min="0"
    :max="99"
    :style="{
      display: 'inline-flex',
      gap: '4px',
      padding: '4px',
      border: '1px dashed var(--sg-color-border)',
      borderRadius: '6px',
    }"
  />
</template>
