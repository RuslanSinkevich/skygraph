<script setup lang="ts">
/**
 * Canonical confirmation after a long operation.
 * `status="success"` picks the checkmark icon and the
 * `--sg-color-success` tint. Put the primary CTA in the `#extra`
 * slot so it sits under the subtitle.
 */
import { SgResult, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgResult
    status="success"
    title="Successfully Purchased!"
    sub-title="Order number: 2017182818828182881."
  >
    <template #extra>
      <SgButton type="primary">Back Home</SgButton>
    </template>
  </SgResult>
</template>
