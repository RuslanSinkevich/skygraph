<script setup lang="ts">
/**
 * Calendar has no component-scoped tokens — it is driven by the global palette.
 * Three scoped recipes — branded green, dark field, glass pick — reskin one
 * instance.
 *
 * Mirrors React `examples/demo/src/demos/calendar/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgCalendar } from '@skygraph/vue'
import TokenScopeCards, { type TokenScopeKey } from '../_shared/TokenScopeCards.vue'

const extra: Partial<Record<TokenScopeKey, CSSProperties>> = {
  brand: { '--sg-color-bg-hover': '#ecfdf5' } as CSSProperties,
  dark: { '--sg-color-bg-hover': '#273449' } as CSSProperties,
  glass: {
    '--sg-color-bg-container': 'rgba(255, 255, 255, 0.86)',
    '--sg-color-border-secondary': 'rgba(79, 70, 229, 0.18)',
  } as CSSProperties,
}
</script>

<template>
  <TokenScopeCards :extra="extra" :min-card-width="380" :content-min-width="320">
    <template #default>
      <SgCalendar :fullscreen="false" />
    </template>
  </TokenScopeCards>
</template>
