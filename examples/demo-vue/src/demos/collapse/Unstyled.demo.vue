<script setup lang="ts">
import { SgCollapse } from '@skygraph/vue'
import { sampleItems } from './data'
</script>

<template>
  <div class="demo-raw-collapse-vue">
    <SgCollapse unstyled :items="sampleItems" :default-active-key="['1']" />
  </div>
</template>

<style>
.demo-raw-collapse-vue {
  font-family: monospace;
  font-size: 13px;
}
.demo-raw-collapse-vue button {
  background: none;
  border: none;
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-top: 1px solid #e2e8f0;
}
.demo-raw-collapse-vue button[aria-expanded='true'] {
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}
.demo-raw-collapse-vue button:first-child {
  border-top: none;
}
.demo-raw-collapse-vue > div > div > div {
  padding: 8px 12px;
  color: #475569;
}
</style>
