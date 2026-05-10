<script setup lang="ts">
/**
 * Minimal `SgTable` — column defs and row data, nothing else.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(5)
</script>

<template>
  <SgTable :columns="userColumns" :data="data" />
</template>
