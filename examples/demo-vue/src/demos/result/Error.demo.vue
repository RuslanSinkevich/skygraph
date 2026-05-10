<script setup lang="ts">
/**
 * Negative outcome — `status="error"` swaps to the red cross
 * icon. Pair with a clear recovery CTA ("Try again" / "Contact
 * support") and keep the subtitle actionable rather than
 * scolding.
 */
import { SgResult, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgResult
    status="error"
    title="Submission Failed"
    sub-title="Please check and modify the following information before resubmitting."
  >
    <template #extra>
      <SgButton type="primary">Try Again</SgButton>
      <SgButton>Contact support</SgButton>
    </template>
  </SgResult>
</template>
