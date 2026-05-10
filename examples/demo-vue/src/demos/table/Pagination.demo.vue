<script setup lang="ts">
/**
 * Built-in pagination: pass `page-size` and the table renders the
 * navigator under the body when row count exceeds page size.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(23)
</script>

<template>
  <SgTable :page-size="5" :columns="userColumns" :data="data" />
</template>
