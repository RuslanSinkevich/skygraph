<script setup lang="ts">
/**
 * Tree inherits all colours from the global tokens — there are no
 * Tree-specific CSS variables. Scope the tokens to skin one Tree, or
 * `data-sg-theme="dark"` to dark-ify just this subtree.
 */
import { SgTree } from '@skygraph/vue'
import { orgTree } from './data'
</script>

<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    "
  >
    <div :style="{ '--sg-color-primary': '#e11d48', '--sg-color-primary-bg': '#ffe4e6' }">
      <SgTree :tree-data="orgTree" default-expand-all />
    </div>
    <div
      data-sg-theme="dark"
      style="
        padding: 10px;
        background: var(--sg-color-bg-container);
        border-radius: var(--sg-border-radius);
      "
    >
      <SgTree :tree-data="orgTree" default-expand-all />
    </div>
  </div>
</template>
