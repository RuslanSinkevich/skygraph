<script setup lang="ts">
/**
 * `disabled` fades the whole pager and kills pointer events. Use it
 * while a table is loading so rapid clicks don't stack up requests
 * that will be thrown away.
 */
import { SgPagination } from '@skygraph/vue'
</script>

<template>
  <SgPagination disabled :current="2" :total="50" />
</template>
