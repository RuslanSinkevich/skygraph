<script setup lang="ts">
/**
 * Menu doesn't expose `--sg-menu-*` tokens — it leans on the global
 * palette. Scope the globals on a wrapper to re-skin a single menu.
 */
import type { CSSProperties } from 'vue'
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'

const scoped = {
  '--sg-color-primary': 'var(--sg-magenta-6)',
  '--sg-color-primary-bg': 'var(--sg-magenta-1)',
  '--sg-color-bg-hover': 'var(--sg-magenta-1)',
  '--sg-border-radius-lg': '12px',
  maxWidth: '256px',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgMenu
      mode="inline"
      :items="sidebarItems"
      :default-open-keys="['team']"
      :default-selected-keys="['members']"
    />
  </div>
</template>
