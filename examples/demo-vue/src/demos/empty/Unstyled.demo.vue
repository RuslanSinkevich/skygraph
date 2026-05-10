<script setup lang="ts">
/**
 * `unstyled` drops every SkyGraph class and keeps only the
 * semantic structure: a wrapper with `role="status"`, the image
 * slot, the paragraph, and your default-slot children.
 *
 * Vue note: `description` is `string` only, so the React
 * `<strong>Your own paint job</strong>` becomes a plain string —
 * we lean on global CSS to add the bold weight.
 */
import { SgEmpty, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgEmpty
    unstyled
    class="demo-raw-empty-vue"
    description="Your own paint job"
  >
    <template #image>
      <span style="font-size: 48px">🗂️</span>
    </template>
    <SgButton type="primary">Action</SgButton>
  </SgEmpty>
</template>

<style>
.demo-raw-empty-vue {
  display: grid;
  place-items: center;
  padding: 24px;
  gap: 12px;
}
.demo-raw-empty-vue p {
  font-weight: 700;
  margin: 0;
}
</style>
