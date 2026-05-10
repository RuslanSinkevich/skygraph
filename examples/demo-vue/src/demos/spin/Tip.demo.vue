<script setup lang="ts">
/**
 * `tip` adds a small caption below the spinner. It inherits
 * `--sg-color-primary` by default so it reads as a "working on
 * it" status message.
 */
import { SgSpin } from '@skygraph/vue'
</script>

<template>
  <SgSpin tip="Loading dashboard data..." spinning>
    <div
      style="
        padding: 24px;
        border: 1px solid var(--sg-color-border);
        border-radius: 8px;
        background: var(--sg-color-bg-container);
      "
    >
      <p>Dashboard content will appear here.</p>
    </div>
  </SgSpin>
</template>
