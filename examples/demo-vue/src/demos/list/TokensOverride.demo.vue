<script setup lang="ts">
/**
 * List doesn't expose component-local tokens — it reads the shared
 * palette. Scope `--sg-color-bg-hover` for the row highlight,
 * `--sg-color-border` for the outline, and `--sg-color-bg-secondary`
 * for the header / footer tint.
 */
import { SgList } from '@skygraph/vue'
import { shortData } from './data'

const scope = {
  '--sg-color-bg-hover': 'var(--sg-color-primary-bg)',
  '--sg-color-border':
    'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
  '--sg-color-bg-secondary': 'var(--sg-color-primary-bg)',
} as Record<string, string>
</script>

<template>
  <div :style="scope">
    <SgList bordered header="Token-styled list" :data-source="shortData">
      <template #default="{ item }">
        <div style="padding: 8px 0">{{ item }}</div>
      </template>
    </SgList>
  </div>
</template>
