<script setup lang="ts">
/**
 * Button exposes a full set of component-local tokens (`--sg-btn-
 * height / radius / padding / font-size / bg / color / border`).
 * Scope them on a wrapper to reshape without losing semantic
 * behaviour like hover / focus / disabled.
 */
import type { CSSProperties } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    pillPrimary: 'Pill primary',
    pillDefault: 'Pill default',
    pillDashed: 'Pill dashed',
  },
  ru: {
    pillPrimary: 'Pill основная',
    pillDefault: 'Pill обычная',
    pillDashed: 'Pill пунктирная',
  },
} as const

const t = useDemoStrings(STRINGS)

const pillScope = {
  '--sg-btn-height': '42px',
  '--sg-btn-radius': '999px',
  '--sg-btn-font-size': '14px',
  '--sg-btn-padding': '0 22px',
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
} as CSSProperties
</script>

<template>
  <div :style="pillScope">
    <SgButton type="primary">{{ t.pillPrimary }}</SgButton>
    <SgButton>{{ t.pillDefault }}</SgButton>
    <SgButton type="dashed">{{ t.pillDashed }}</SgButton>
  </div>
</template>
