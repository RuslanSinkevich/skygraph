<script setup lang="ts">
/**
 * An empty `dataSource` renders the built-in Empty component with
 * `locale.emptyText` as the description — override it for your own
 * copy.
 */
import { SgList } from '@skygraph/vue'
</script>

<template>
  <SgList
    bordered
    :data-source="[]"
    :locale="{ emptyText: 'No notifications yet — you are all caught up.' }"
  />
</template>
