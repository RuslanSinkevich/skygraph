<script setup lang="ts">
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
</script>

<template>
  <SgBreadcrumb
    unstyled
    :items="
      [
        { title: 'Home', href: '#' },
        { title: 'Docs', href: '#docs' },
        { title: 'Routing' },
      ] as BreadcrumbItem[]
    "
  />
</template>
