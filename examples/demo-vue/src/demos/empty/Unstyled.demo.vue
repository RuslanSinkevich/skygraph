<script setup lang="ts">
import { SgEmpty, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgEmpty unstyled class="demo-raw-empty-vue" description="Your own paint job">
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
