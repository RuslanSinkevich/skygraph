<script setup lang="ts">
import { StubShowcase, useShowcaseLocale } from '../_shared'

const locale = useShowcaseLocale()
const card = locale.cards['ecommerce']
</script>

<template>
  <StubShowcase
    :title="card?.title ?? 'E-Commerce Admin'"
    :description="card?.description ?? ''"
    react-key="ecommerce"
    :tags="['Gallery', 'Carousel', 'Modal', 'Drawer', 'Steps', 'Form']"
  />
</template>
