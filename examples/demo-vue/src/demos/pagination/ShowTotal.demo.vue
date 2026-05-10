<script setup lang="ts">
/**
 * `showTotal` is a boolean — Vue does not accept a render function
 * here. The "Total N" prefix is taken from
 * `SgConfigProvider.locale.pagination.totalPrefix`.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(3)
function onChange(p: number) {
  page.value = p
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <SgPagination :current="page" :total="85" show-total @change="onChange" />
    <SgPagination :current="page" :total="85" :page-size="10" show-total @change="onChange" />
  </div>
</template>
