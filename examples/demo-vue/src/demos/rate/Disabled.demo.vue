<script setup lang="ts">
/**
 * `disabled` locks the rating and greys the control. Useful for
 * displaying reviews in a read-only table row.
 */
import { SgRate } from '@skygraph/vue'
</script>

<template>
  <div style="display: grid; gap: 12px">
    <SgRate disabled :default-value="4" />
    <SgRate disabled allow-half :default-value="3.5" />
  </div>
</template>
