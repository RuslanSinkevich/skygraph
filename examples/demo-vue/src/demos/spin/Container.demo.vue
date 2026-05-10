<script setup lang="ts">
/**
 * Wrap children with Spin and toggle `spinning` to mask them.
 * The wrapped content gets a dimmed overlay + `pointer-events:
 * none` while the spinner is visible.
 */
import { ref } from 'vue'
import { SgSpin, SgButton } from '@skygraph/vue'

const loading = ref(true)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgButton @click="loading = !loading">
      {{ loading ? 'Stop loading' : 'Start loading' }}
    </SgButton>
    <SgSpin :spinning="loading">
      <div
        style="
          padding: 24px;
          border: 1px solid var(--sg-color-border);
          border-radius: 8px;
          background: var(--sg-color-bg-container);
        "
      >
        <p style="margin-top: 0">Some content that is being loaded.</p>
        <p style="margin-bottom: 0">It is blurred while the overlay is on.</p>
      </div>
    </SgSpin>
  </div>
</template>
