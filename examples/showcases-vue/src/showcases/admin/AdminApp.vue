<script setup lang="ts">
import { StubShowcase, useShowcaseLocale } from '../_shared'

const locale = useShowcaseLocale()
const card = locale.cards['admin']
</script>

<template>
  <StubShowcase
    :title="card?.title ?? 'Permissions & Roles'"
    :description="card?.description ?? ''"
    react-key="admin"
    :tags="['Transfer', 'Table', 'Drawer', 'Collapse', 'Switch', 'Popconfirm', 'Tabs']"
  />
</template>
