<script setup lang="ts">
/**
 * `unstyled` drops every `sg-pagination-*` class so you can paint the
 * pager from scratch. The underlying button list, ellipsis folding,
 * keyboard handling and a11y stay intact.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(1)
function onChange(p: number) {
  page.value = p
}
</script>

<template>
  <div class="custom-pager">
    <SgPagination unstyled :current="page" :total="50" @change="onChange" />
  </div>
</template>

<style scoped>
.custom-pager :deep(button) {
  margin: 0 4px;
  padding: 6px 12px;
  border: 2px dashed #94a3b8;
  border-radius: 4px;
  background: transparent;
  color: #1e293b;
  font: inherit;
  cursor: pointer;
}

.custom-pager :deep(button:disabled) {
  opacity: 0.4;
  cursor: not-allowed;
}

.custom-pager :deep(button[aria-current='page']) {
  border-color: #6366f1;
  background: #6366f1;
  color: #fff;
}
</style>
