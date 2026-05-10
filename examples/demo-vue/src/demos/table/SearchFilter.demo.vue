<script setup lang="ts">
/**
 * Built-in toolbar search. With `searchable`, the table renders an
 * input that filters across all visible columns (case-insensitive).
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(20)
</script>

<template>
  <SgTable searchable :page-size="6" :columns="userColumns" :data="data" />
</template>
