<script setup lang="ts">
/**
 * `unstyled` renders a plain list with `data-status` on each
 * row. Everything else — structure, click behaviour — stays.
 */
import { SgSteps } from '@skygraph/vue'
import { basicSteps } from './data'
</script>

<template>
  <SgSteps unstyled class="demo-raw-steps" :current="1" :items="basicSteps" />
</template>

<style scoped>
.demo-raw-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.demo-raw-steps :deep(> div) {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  background: #f8fafc;
}

.demo-raw-steps :deep(> div[data-status='finish']) {
  background: #dcfce7;
  color: #14532d;
}

.demo-raw-steps :deep(> div[data-status='process']) {
  background: #dbeafe;
  color: #1e3a8a;
  font-weight: 600;
}

.demo-raw-steps :deep(> div[data-status='error']) {
  background: #fee2e2;
  color: #7f1d1d;
}
</style>
