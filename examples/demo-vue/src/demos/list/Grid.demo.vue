<script setup lang="ts">
/**
 * `grid` switches the items container to CSS Grid. `column` is the
 * base count, `xs / sm / md / lg` are breakpoint overrides, `gutter`
 * controls the gap in pixels.
 */
import { SgList } from '@skygraph/vue'
import { cards } from './data'
</script>

<template>
  <SgList :grid="{ gutter: 16, column: 3, sm: 2, xs: 1 }" :data-source="cards">
    <template #default="{ item }">
      <div
        style="
          padding: 16px;
          border: 1px solid var(--sg-color-border-secondary);
          border-radius: 8px;
          text-align: center;
          background: var(--sg-color-bg);
        "
      >
        {{ item }}
      </div>
    </template>
  </SgList>
</template>
