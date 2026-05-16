<script setup lang="ts">
import { StubShowcase, useShowcaseLocale } from '../_shared'

const locale = useShowcaseLocale()
const card = locale.cards['hr-portal']
</script>

<template>
  <StubShowcase
    :title="card?.title ?? 'HR Portal'"
    :description="card?.description ?? ''"
    react-key="hr-portal"
    :tags="['Tree', 'Table', 'Calendar', 'Steps', 'Transfer', 'Collapse']"
  />
</template>
