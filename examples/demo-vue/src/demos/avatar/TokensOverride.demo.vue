<script setup lang="ts">
/**
 * Avatar has no component-specific tokens — square corners follow
 * `--sg-border-radius` and the fallback background is
 * `--sg-color-text-disabled`. Override those globals to reshape and
 * restyle every avatar in the subtree at once.
 */
import type { CSSProperties } from 'vue'
import { SgAvatar } from '@skygraph/vue'

const scoped: CSSProperties = {
  ['--sg-border-radius' as never]: '12px',
  ['--sg-color-text-disabled' as never]: '#7c3aed',
  ['--sg-color-white' as never]: '#fef3c7',
}
</script>

<template>
  <div :style="{ ...scoped, display: 'flex', gap: '12px', alignItems: 'center' }">
    <SgAvatar size="large">A</SgAvatar>
    <SgAvatar size="large" shape="square">B</SgAvatar>
    <SgAvatar size="large" shape="square">C</SgAvatar>
  </div>
</template>
