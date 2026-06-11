<script setup lang="ts">
/**
 * Segmented composes the global scale — `--sg-color-bg-secondary` for the
 * track, `--sg-color-bg-container` for the selected thumb. Three scoped
 * recipes — branded green, dark field, glass pick — repaint the control.
 *
 * Mirrors React `examples/demo/src/demos/segmented/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgSegmented } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-secondary': '#d1fae5' } as CSSProperties,
  dark: { '--sg-color-bg-container': '#334155' } as CSSProperties,
  glass: { '--sg-color-bg-container': 'rgba(255, 255, 255, 0.85)' } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra">
    <template #default>
      <SgSegmented default-value="B" :options="['A', 'B', 'C', 'D']" />
    </template>
  </TokenScopeCards>
</template>
