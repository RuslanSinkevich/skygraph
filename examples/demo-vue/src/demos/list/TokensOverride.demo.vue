<script setup lang="ts">
/**
 * List has no component-local tokens — row hover reads `--sg-color-bg-hover`,
 * the outline reads `--sg-color-border`, the header tint reads
 * `--sg-color-bg-secondary`. Three scoped recipes — branded green, dark field,
 * glass pick — reskin it.
 *
 * Mirrors React `examples/demo/src/demos/list/TokensOverride.demo.tsx`.
 */
import { SgList } from '@skygraph/vue'
import { shortData } from './data'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const header = 'List'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgList bordered :header="header" :data-source="shortData">
        <template #default="{ item }">
          <div style="padding: 8px 0">{{ item }}</div>
        </template>
      </SgList>
    </template>
  </TokenScopeCards>
</template>
