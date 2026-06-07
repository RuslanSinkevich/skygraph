<script setup lang="ts">
import { SgBadge } from '@skygraph/vue'

const box = {
  width: '42px',
  height: '42px',
  borderRadius: '6px',
  background: '#1e293b',
  display: 'inline-block',
}
</script>

<template>
  <div
    style="
      padding: 16px;
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 8px;
      display: inline-block;
    "
  >
    <SgBadge unstyled :count="7" :style="{ ['--badge-bg' as never]: '#f472b6' }">
      <div :style="box" />
    </SgBadge>
  </div>
</template>
