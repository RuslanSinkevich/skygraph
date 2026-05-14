<script setup lang="ts">
/**
 * Override the auto-generated number/check with your own glyph via
 * `item.icon`. Custom icons render at `--sg-font-size-lg` and still
 * sit inside the 32-px status ring, so colour follows the step
 * status automatically.
 */
import { SgSteps } from '@skygraph/vue'

const items = [
  { title: 'Login', icon: '🔑' },
  { title: 'Verify', icon: '✉️' },
  { title: 'Pay', icon: '💳' },
  { title: 'Done', icon: '🎉' },
]
</script>

<template>
  <SgSteps :current="1" :items="items" />
</template>
