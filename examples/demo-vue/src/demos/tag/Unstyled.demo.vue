<script setup lang="ts">
import { SgTag } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 8px">
    <SgTag
      unstyled
      closable
      :style="{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 10px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #f472b6, #7c3aed)',
        color: '#fff',
        fontSize: '12px',
      }"
    >
      Custom gradient
    </SgTag>
  </div>
</template>
