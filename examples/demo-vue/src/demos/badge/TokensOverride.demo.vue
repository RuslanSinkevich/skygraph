<script setup lang="ts">
/**
 * Badge has no component-specific tokens — `sg-badge-count` pulls
 * from `--sg-color-error` for the background and `--sg-color-bg` for
 * the tiny outline. Scope those globals to rebrand your counters.
 */
import type { CSSProperties } from 'vue'
import { SgBadge } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    connecting: 'Connecting…',
  },
  ru: {
    connecting: 'Подключение…',
  },
} as const

const t = useDemoStrings(STRINGS)

const scoped: CSSProperties = {
  ['--sg-color-error' as never]: '#7c3aed',
  ['--sg-color-primary' as never]: '#f97316',
  ['--sg-color-bg' as never]: '#fef3c7',
}

const box = {
  width: '42px',
  height: '42px',
  borderRadius: '6px',
  background: 'var(--sg-color-bg-container)',
  border: '1px solid color-mix(in srgb, var(--sg-color-error) 30%, transparent)',
  boxShadow: 'inset 0 0 0 1px color-mix(in srgb, white 55%, transparent)',
  display: 'inline-block',
}
</script>

<template>
  <div :style="{ ...scoped, display: 'flex', gap: '24px', padding: '16px', background: '#fef3c7' }">
    <SgBadge :count="5"><div :style="box" /></SgBadge>
    <SgBadge dot><div :style="box" /></SgBadge>
    <SgBadge status="processing" :text="t.connecting" />
  </div>
</template>
