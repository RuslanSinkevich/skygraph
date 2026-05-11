<script setup lang="ts">
/**
 * Swap the caption to match the context. Keep the message
 * action-oriented when you can — "No results for 'foo'" reads
 * better than just "Empty".
 *
 * Vue note: `description` is `string | null` only — no slot for
 * VNode content, unlike the React analogue. See findings →
 * `empty-rich-description-no-vue`.
 */
import { SgEmpty } from '@skygraph/vue'
</script>

<template>
  <div
    style="
      display: grid;
      gap: 24px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      width: 100%;
    "
  >
    <SgEmpty description="No results found" />
    <SgEmpty description="No invoices matching status=paid" />
  </div>
</template>
