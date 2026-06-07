<script setup lang="ts">
import { SgDropdown, SgButton } from '@skygraph/vue'
import { makeActionItems } from './data'

const items = makeActionItems({
  edit: 'Edit',
  duplicate: 'Duplicate',
  archive: 'Archive (soon)',
  delete: 'Delete…',
})
</script>

<template>
  <SgDropdown unstyled :items="items" trigger="click">
    <SgButton>Unstyled trigger</SgButton>
  </SgDropdown>
</template>
