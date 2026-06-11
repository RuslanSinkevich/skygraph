<script setup lang="ts">
/**
 * The default ring reads `--sg-color-primary`, the connector reads
 * `--sg-color-border-secondary`, the pending content reads
 * `--sg-color-text-tertiary`. Three scoped recipes — branded green, dark
 * field, glass pick — rebrand the whole timeline.
 *
 * Mirrors React `examples/demo/src/demos/timeline/TokensOverride.demo.tsx`.
 */
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgTimeline :items="releaseItems" pending="Awaiting…" />
    </template>
  </TokenScopeCards>
</template>
