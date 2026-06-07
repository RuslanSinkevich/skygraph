<script setup lang="ts">
import { SgList } from '@skygraph/vue'
import { shortData } from './data'
</script>

<template>
  <SgList unstyled :class-names="{ root: 'demo-raw-list' }" :data-source="shortData">
    <template #default="{ item }">
      <div>{{ item }}</div>
    </template>
  </SgList>
</template>

<style>
.demo-raw-list {
  border: 2px dashed #a3a3a3;
  padding: 16px;
  border-radius: 12px;
}
.demo-raw-list > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.demo-raw-list > div > div {
  padding: 8px 10px;
  border-radius: 8px;
  background: #f5f5f5;
}
.demo-raw-list > div > div:hover {
  background: #e7e5e4;
}
</style>
