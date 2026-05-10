<script setup lang="ts">
/**
 * Default trail. The last item is the current page (no `href`).
 */
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { home: 'Home', projects: 'Projects', current: 'Atlas redesign' },
  ru: { home: 'Главная', projects: 'Проекты', current: 'Atlas redesign' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <SgBreadcrumb
    :items="[
      { title: t.home, href: '#' },
      { title: t.projects, href: '#projects' },
      { title: t.current },
    ] as BreadcrumbItem[]"
  />
</template>
