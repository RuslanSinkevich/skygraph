<script setup lang="ts">
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
</script>

<template>
  <div class="demo-raw-desc-vue">
    <SgDescriptions unstyled title="Raw descriptions" :items="userItems" />
  </div>
</template>

<style>
.demo-raw-desc-vue {
  font-family: system-ui, sans-serif;
}
.demo-raw-desc-vue > div > div:first-child {
  font-weight: 700;
  margin-bottom: 10px;
}
.demo-raw-desc-vue table {
  border-collapse: collapse;
  width: 100%;
}
.demo-raw-desc-vue th {
  text-align: left;
  padding: 6px 12px 6px 0;
  color: #475569;
  font-weight: 500;
}
.demo-raw-desc-vue td {
  padding: 6px 0;
}
</style>
