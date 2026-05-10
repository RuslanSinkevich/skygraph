<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class. The ARIA semantics
 * (`role="radiogroup"`, each star `role="radio"`) are preserved.
 */
import { SgRate } from '@skygraph/vue'
</script>

<template>
  <SgRate
    unstyled
    :default-value="3"
    style="display: inline-flex; gap: 4px; font-size: 28px; color: #d1d5db"
  />
</template>
