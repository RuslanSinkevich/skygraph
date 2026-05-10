<script setup lang="ts">
/**
 * `bordered` wraps the table in a rounded border, tints the
 * label column with `--sg-color-bg-secondary` and inserts
 * dividers between rows. Use it for settled, read-only
 * summaries (invoices, account details).
 */
import { SgDescriptions } from '@skygraph/vue'
import { userItems } from './data'
</script>

<template>
  <SgDescriptions bordered title="User info" :items="userItems" />
</template>
