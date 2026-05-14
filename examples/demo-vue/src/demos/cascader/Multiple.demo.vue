<script setup lang="ts">
/**
 * `multiple` keeps each committed path as a removable tag; `maxTagCount`
 * collapses overflow into a "+N" summary. Uncontrolled for simplicity —
 * Cascader owns the tag list internally.
 */
import { SgCascader } from '@skygraph/vue'
import { categoryOptions } from './data'
</script>

<template>
  <div style="max-width: 420px">
    <SgCascader
      :options="categoryOptions"
      multiple
      :max-tag-count="2"
      :default-value="['frontend', 'react', 'hooks']"
      placeholder="Pick multiple stacks"
    />
  </div>
</template>
