<script setup lang="ts">
/**
 * Pagination composes the form-chip tokens for idle buttons and the primary
 * palette for the active chip. Three scoped recipes — branded green, dark
 * field, glass pick — restyle the whole pager.
 *
 * Mirrors React `examples/demo/src/demos/pagination/TokensOverride.demo.tsx`.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const page = ref(3)
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgPagination :current="page" :total="120" @change="(p: number) => (page = p)" />
    </template>
  </TokenScopeCards>
</template>
