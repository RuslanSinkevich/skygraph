<script setup lang="ts">
/**
 * Large dataset (1 000 rows) rendered with pagination. Vue's table
 * doesn't ship a virtual scroller — `pageSize` is the standard way
 * to keep render cost bounded.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(1000)
</script>

<template>
  <div>
    <div style="margin-bottom: 6px; font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ data.length }} rows, paginated 20 per page
    </div>
    <SgTable :page-size="20" :columns="userColumns" :data="data" />
  </div>
</template>
