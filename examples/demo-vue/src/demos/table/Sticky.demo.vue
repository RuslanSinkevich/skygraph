<script setup lang="ts">
/**
 * `sticky` keeps the header visible while you scroll the body. Wrap
 * the table in a fixed-height container so the body actually scrolls.
 */
import { SgTable } from '@skygraph/vue'
import { makeUserRows, userColumns } from './_data'

const data = makeUserRows(40)
</script>

<template>
  <div style="height: 280px; overflow: auto; border: 1px solid var(--sg-color-border); border-radius: 6px">
    <SgTable sticky :columns="userColumns" :data="data" />
  </div>
</template>
