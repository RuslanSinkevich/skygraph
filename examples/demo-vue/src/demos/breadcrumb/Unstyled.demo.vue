<script setup lang="ts">
/**
 * `unstyled` keeps `<nav aria-label="Breadcrumb">` + ARIA semantics
 * but drops every `sg-breadcrumb-*` class. Bring your own CSS.
 */
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { home: 'Home', docs: 'Docs', current: 'Routing' },
  ru: { home: 'Главная', docs: 'Документация', current: 'Роутинг' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgBreadcrumb
    unstyled
    :items="[
      { title: t.home, href: '#' },
      { title: t.docs, href: '#docs' },
      { title: t.current },
    ] as BreadcrumbItem[]"
  />
</template>
