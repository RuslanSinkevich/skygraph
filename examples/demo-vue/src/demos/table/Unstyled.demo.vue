<script setup lang="ts">
/**
 * `unstyled` strips Skygraph CSS so you can apply a fully custom
 * design system. The DOM and `sg-*` classes stay the same so your
 * styles are predictable.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(5)
</script>

<template>
  <div class="demo-unstyled-shell">
    <SgTable unstyled :columns="userColumns" :data="data" />
  </div>
</template>

<style>
.demo-unstyled-shell {
  font-family: ui-monospace, SFMono-Regular, monospace;
  border: 1px dashed #999;
  padding: 12px;
}
.demo-unstyled-shell .sg-table-th,
.demo-unstyled-shell .sg-table-td {
  padding: 6px 12px;
  border: 1px solid #ccc;
  text-align: left;
}
.demo-unstyled-shell .sg-table-th {
  background: #f4f4f4;
  font-weight: 600;
}
</style>
