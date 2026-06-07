<script setup lang="ts">
import { SgCascader } from '@skygraph/vue'
import { regionOptions } from './data'
</script>

<template>
  <div style="max-width: 340px">
    <SgCascader :options="regionOptions" unstyled placeholder="Unstyled" />
  </div>
</template>
