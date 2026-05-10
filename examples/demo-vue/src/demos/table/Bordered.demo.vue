<script setup lang="ts">
/**
 * `bordered` adds outlined borders to the entire grid.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(5)
</script>

<template>
  <SgTable bordered :columns="userColumns" :data="data" />
</template>
