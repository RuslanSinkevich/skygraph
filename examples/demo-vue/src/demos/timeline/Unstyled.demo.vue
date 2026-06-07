<script setup lang="ts">
import { SgTimeline } from '@skygraph/vue'
import { releaseItems } from './data'
</script>

<template>
  <SgTimeline unstyled class="demo-raw-timeline-vue" :items="releaseItems" />
</template>

<style>
.demo-raw-timeline-vue {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-raw-timeline-vue li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #f1f5f9;
  border-radius: 8px;
}
.demo-raw-timeline-vue li > span:first-child {
  font-size: 18px;
}
</style>
