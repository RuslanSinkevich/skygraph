<script setup lang="ts">
/**
 * `showSizeChanger` appends a native `<select>` for page size, and
 * `showQuickJumper` adds a "Go to" input. Combined with
 * `showTotal`, you get the full enterprise-table chrome.
 */
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'

const page = ref(1)
const size = ref(20)

function onChange(p: number) {
  page.value = p
}

function onPageSizeChange(n: number) {
  size.value = n
  page.value = 1
}
</script>

<template>
  <SgPagination
    :current="page"
    :page-size="size"
    :total="487"
    :page-size-options="[10, 20, 50, 100]"
    show-total
    show-size-changer
    show-quick-jumper
    @change="onChange"
    @page-size-change="onPageSizeChange"
  />
</template>
