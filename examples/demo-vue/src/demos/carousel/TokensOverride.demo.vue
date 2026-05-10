<script setup lang="ts">
/**
 * The active dot reads `--sg-color-primary`, idle dots use
 * `--sg-color-text-disabled`, hover uses
 * `--sg-color-text-tertiary`. Scope any of them to rebrand.
 */
import type { CSSProperties } from 'vue'
import { SgCarousel } from '@skygraph/vue'
import { slideBase, paletteColors } from './data'

const scope: CSSProperties = {
  ['--sg-color-primary' as never]: '#f97316',
  ['--sg-color-text-disabled' as never]: 'rgba(249, 115, 22, 0.25)',
  ['--sg-color-text-tertiary' as never]: 'rgba(249, 115, 22, 0.55)',
}
</script>

<template>
  <div :style="scope">
    <SgCarousel>
      <div v-for="(bg, i) in paletteColors" :key="i" :style="{ ...slideBase, background: bg }">
        Brand {{ i + 1 }}
      </div>
    </SgCarousel>
  </div>
</template>
