<script setup lang="ts">
import { StubShowcase, useShowcaseLocale } from '../_shared'

const locale = useShowcaseLocale()
const card = locale.cards['file-manager']
</script>

<template>
  <StubShowcase
    :title="card?.title ?? 'File Manager'"
    :description="card?.description ?? ''"
    react-key="file-manager"
    :tags="['Tree', 'VirtualList', 'Breadcrumb', 'Upload', 'Drawer', 'Modal']"
  />
</template>
