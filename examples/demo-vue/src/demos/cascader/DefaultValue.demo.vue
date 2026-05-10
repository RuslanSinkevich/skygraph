<script setup lang="ts">
/**
 * Uncontrolled — Cascader owns the state and starts with a preset path.
 */
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
</script>

<template>
  <div style="max-width: 340px">
    <SgCascader :options="regionOptions" :default-value="['zhejiang', 'hangzhou', 'xihu']" />
  </div>
</template>
