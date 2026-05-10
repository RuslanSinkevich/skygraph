<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class (ring + overlay + tip)
 * while keeping the `delay`, `spinning`, and child overlay
 * logic. Best paired with a custom `#indicator` slot.
 */
import { SgSpin } from '@skygraph/vue'
</script>

<template>
  <SgSpin unstyled tip="Bring your own style">
    <template #indicator>
      <span style="font-size: 22px" aria-hidden="true">🌀</span>
    </template>
  </SgSpin>
</template>
