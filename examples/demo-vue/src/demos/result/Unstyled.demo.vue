<script setup lang="ts">
/**
 * `unstyled` keeps the semantic structure and `aria-live` but
 * drops every SkyGraph class. The preset icon still resolves
 * from the `status`, so you get the SVG without the chrome.
 */
import { SgResult, SgButton } from '@skygraph/vue'

const wrapperStyle = {
  display: 'grid',
  justifyItems: 'center',
  padding: '24px',
  gap: '8px',
  background: '#ecfdf5',
  border: '1px solid #a7f3d0',
  borderRadius: '12px',
  color: '#065f46',
}
</script>

<template>
  <SgResult
    unstyled
    status="success"
    title="Saved"
    sub-title="Your changes were persisted."
    :style="wrapperStyle"
  >
    <template #extra>
      <SgButton type="primary">OK</SgButton>
    </template>
  </SgResult>
</template>
