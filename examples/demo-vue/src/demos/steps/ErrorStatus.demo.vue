<script setup lang="ts">
/**
 * Per-item `status` overrides the one derived from `current` —
 * use it to freeze an error in the wizard and prevent auto-
 * advancement.
 */
import { SgSteps, type StepItem } from '@skygraph/vue'

const items: StepItem[] = [
  { title: 'Finished', description: 'User account verified.' },
  { title: 'Payment failed', description: 'Card declined — retry below.', status: 'error' },
  { title: 'Confirmation' },
]
</script>

<template>
  <SgSteps :current="1" :items="items" />
</template>
