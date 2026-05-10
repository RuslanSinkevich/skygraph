<script setup lang="ts">
/**
 * Click on a `sortable` column header to cycle asc → desc → none.
 * `name` and `team` are sortable in this demo.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(7)
</script>

<template>
  <SgTable :columns="userColumns" :data="data" />
</template>
