<script setup lang="ts">
/**
 * `#indicator` slot replaces the default ring entirely. Any
 * Vue node works — emoji, SVG, or a library icon with its own
 * spin keyframe.
 */
import { SgSpin } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <SgSpin>
      <template #indicator>
        <span style="font-size: 22px" aria-hidden="true">⏳</span>
      </template>
    </SgSpin>
    <SgSpin>
      <template #indicator>
        <span style="font-size: 22px" aria-hidden="true">🌀</span>
      </template>
    </SgSpin>
    <SgSpin>
      <template #indicator>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#e5e7eb" stroke-width="3" />
          <path
            d="M12 2a10 10 0 0110 10"
            stroke="#2563eb"
            stroke-width="3"
            stroke-linecap="round"
            style="
              transform-origin: center;
              animation: sg-spin-rotate 0.8s linear infinite;
            "
          />
        </svg>
      </template>
    </SgSpin>
  </div>
</template>
