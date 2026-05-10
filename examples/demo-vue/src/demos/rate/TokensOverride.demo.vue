<script setup lang="ts">
/**
 * Rate owns **one** dedicated token: `--sg-color-star` for the filled
 * colour. The empty colour comes from the global `--sg-color-border`;
 * the symbol size from `--sg-font-size-xl`.
 */
import type { CSSProperties } from 'vue'
import { SgRate } from '@skygraph/vue'

const gold = {
  '--sg-color-star': '#fbbf24',
} as CSSProperties

const rose = {
  '--sg-color-star': '#e11d48',
  '--sg-color-border': '#fecdd3',
  '--sg-font-size-xl': '28px',
} as CSSProperties
</script>

<template>
  <div style="display: grid; gap: 16px">
    <div :style="gold">
      <SgRate :default-value="4" />
    </div>
    <div :style="rose">
      <SgRate :default-value="3.5" allow-half character="♥" />
    </div>
  </div>
</template>
