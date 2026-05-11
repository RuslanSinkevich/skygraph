<script setup lang="ts">
/**
 * Canonical usage inside a Table / List / Card — wrap Empty in a
 * bordered container so it visually owns the row region. The
 * action button lets users recover from the empty state.
 */
import { SgEmpty, SgButton } from '@skygraph/vue'
</script>

<template>
  <div
    class="demo-card-host"
    style="
      border: 1px solid var(--sg-color-border);
      border-radius: var(--sg-border-radius);
      padding: 24px;
      background: var(--sg-color-bg-container);
      width: 100%;
    "
  >
    <SgEmpty description="No rows match your filters">
      <SgButton size="small">Reset filters</SgButton>
    </SgEmpty>
  </div>
</template>
