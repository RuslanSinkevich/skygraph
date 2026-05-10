<script setup lang="ts">
/**
 * Default slot renders below the description. Use for primary
 * calls to action — "Create", "Reset filters", "Invite someone".
 * Keep it to one or two buttons so the empty state stays
 * scannable.
 */
import { SgEmpty, SgButton } from '@skygraph/vue'
</script>

<template>
  <SgEmpty description="You haven't created any projects yet">
    <div style="display: flex; gap: 8px; justify-content: center">
      <SgButton type="primary">Create project</SgButton>
      <SgButton>Import</SgButton>
    </div>
  </SgEmpty>
</template>
