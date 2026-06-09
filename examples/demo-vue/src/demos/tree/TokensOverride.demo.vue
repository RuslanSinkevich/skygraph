<script setup lang="ts">
/**
 * Tree inherits all of its colours from the global tokens — there are no
 * Tree-specific CSS variables. Three scoped recipes — branded green, dark
 * field, glass pick — skin one tree. The dark scope also flips
 * `--sg-color-text-secondary`, which the expand/collapse switcher arrow reads.
 *
 * Mirrors React `examples/demo/src/demos/tree/TokensOverride.demo.tsx`.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgTree :tree-data="orgTree" default-expand-all />
    </template>
  </TokenScopeCards>
</template>
