<script setup lang="ts">
/**
 * Result has no component-private tokens — it reads
 * `--sg-color-success/error/warning/primary` for icon tints, the
 * text palette for title/subtitle, and `--sg-color-bg-secondary`
 * for the body panel. Scope them on a wrapper to rebrand.
 */
import { SgResult, SgButton } from '@skygraph/vue'

const scoped = {
  '--sg-color-success': '#059669',
  '--sg-color-primary': '#0ea5e9',
  '--sg-color-bg-secondary': '#f0fdfa',
  '--sg-font-size-xl': '24px',
  '--sg-border-radius': '12px',
} as Record<string, string>
</script>

<template>
  <div :style="scoped">
    <SgResult
      status="success"
      title="All good"
      sub-title="Brand scoped to teal via --sg-color-primary / --sg-color-success"
    >
      <template #extra>
        <SgButton type="primary">Continue</SgButton>
      </template>
      <span>Extra info panel also follows the scoped background token.</span>
    </SgResult>
  </div>
</template>
