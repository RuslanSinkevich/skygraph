<script setup lang="ts">
/**
 * Progress has no component-private tokens — bars and rings read
 * `--sg-color-primary`, `--sg-color-bg-hover` and `--sg-color-success/error`.
 * Three scoped recipes — branded green, dark field, glass pick — rebrand them.
 *
 * Mirrors React `examples/demo/src/demos/progress/TokensOverride.demo.tsx`.
 */
import { SgProgress } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <div style="display: flex; flex-direction: column; gap: 10px">
        <SgProgress :percent="35" />
        <SgProgress :percent="75" status="active" />
      </div>
    </template>
  </TokenScopeCards>
</template>
