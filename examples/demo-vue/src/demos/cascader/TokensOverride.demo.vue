<script setup lang="ts">
/**
 * Cascader has no component-scoped tokens — it is styled entirely
 * through the global palette. Override the global variables on a
 * scoped wrapper to re-skin a single Cascader without affecting the
 * page.
 */
import type { CSSProperties } from 'vue'
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'

const scoped = {
  '--sg-color-primary': 'var(--sg-purple-6)',
  '--sg-color-primary-hover': 'var(--sg-purple-5)',
  '--sg-color-primary-bg': 'var(--sg-purple-1)',
  '--sg-border-radius': '12px',
  '--sg-shadow-lg': '0 16px 40px rgba(88, 55, 177, 0.24)',
  maxWidth: '340px',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgCascader :options="regionOptions" :default-value="['zhejiang', 'hangzhou', 'xihu']" />
  </div>
</template>
