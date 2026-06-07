<script setup lang="ts">
import { SgResult, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgResult
    unstyled
    status="success"
    title="Saved"
    sub-title="Your changes were persisted."
    :style="{
      display: 'grid',
      justifyItems: 'center',
      padding: '24px',
      gap: '8px',
      background: '#ecfdf5',
      border: '1px solid #a7f3d0',
      borderRadius: '12px',
      color: '#065f46',
    }"
  >
    <template #extra>
      <SgButton type="primary">OK</SgButton>
    </template>
  </SgResult>
</template>
