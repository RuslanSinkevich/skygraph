<script setup lang="ts">
import { SgAvatar } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 12px">
    <SgAvatar
      unstyled
      src="https://api.dicebear.com/7.x/miniavs/svg?seed=24"
      alt="Custom"
      :style="{
        display: 'inline-block',
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 6px 16px rgba(15, 23, 42, 0.2)',
        background: '#0f172a',
      }"
    />
  </div>
</template>
