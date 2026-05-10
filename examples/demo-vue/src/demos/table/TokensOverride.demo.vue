<script setup lang="ts">
/**
 * Override the global Skygraph design tokens for this subtree to
 * recolor the table without forking it. Useful for embedding into
 * non-default brand surfaces.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(5)
</script>

<template>
  <div class="demo-table-rebrand">
    <SgTable bordered :columns="userColumns" :data="data" />
  </div>
</template>

<style>
.demo-table-rebrand {
  --sg-color-border: #6366f1;
  --sg-color-text-primary: #1e1b4b;
  --sg-color-bg-elevated: #eef2ff;
}
</style>
