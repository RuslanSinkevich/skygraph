<script setup lang="ts">
/**
 * `unstyled` keeps the stepper logic (`role="spinbutton"`, `+` / `−`
 * buttons, clamping) but removes every SkyGraph class. Ship your own
 * layout and borders.
 */
import type { CSSProperties } from 'vue'
import { SgInputNumber } from '@skygraph/vue'

const wrap = {
  display: 'inline-flex',
  gap: '4px',
  padding: '4px',
  border: '1px dashed var(--sg-color-border)',
  borderRadius: '6px',
} as CSSProperties
</script>

<template>
  <SgInputNumber unstyled :default-value="10" :min="0" :max="99" :style="wrap" />
</template>
