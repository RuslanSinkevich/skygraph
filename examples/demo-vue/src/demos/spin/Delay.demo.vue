<script setup lang="ts">
/**
 * `delay` in ms — wait that long before actually showing the
 * spinner. Great for fast requests that usually finish before
 * the spinner is worth showing, to avoid the flicker.
 */
import { ref } from 'vue'
import { SgSpin, SgButton } from '@skygraph/vue'

const loading = ref(false)

function simulate(ms: number) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, ms)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 8px">
      <SgButton @click="simulate(200)">Finish in 200ms (spinner skipped)</SgButton>
      <SgButton @click="simulate(2500)">Finish in 2500ms (spinner appears)</SgButton>
    </div>
    <SgSpin :spinning="loading" :delay="400">
      <div
        style="
          padding: 24px;
          border: 1px solid var(--sg-color-border);
          border-radius: 8px;
          background: var(--sg-color-bg-container);
        "
      >
        <p>The spinner only appears if loading lasts longer than 400ms.</p>
      </div>
    </SgSpin>
  </div>
</template>
