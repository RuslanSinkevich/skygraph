<script setup lang="ts">
/**
 * `separator` accepts any string — chevron, dot, ASCII arrow.
 * Three trails to compare.
 */
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { home: 'Home', team: 'Team', current: 'Roles' },
  ru: { home: 'Главная', team: 'Команда', current: 'Роли' },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgBreadcrumb
      separator="›"
      :items="[
        { title: t.home, href: '#' },
        { title: t.team, href: '#team' },
        { title: t.current },
      ] as BreadcrumbItem[]"
    />
    <SgBreadcrumb
      separator="•"
      :items="[
        { title: t.home, href: '#' },
        { title: t.team, href: '#team' },
        { title: t.current },
      ] as BreadcrumbItem[]"
    />
    <SgBreadcrumb
      separator="→"
      :items="[
        { title: t.home, href: '#' },
        { title: t.team, href: '#team' },
        { title: t.current },
      ] as BreadcrumbItem[]"
    />
  </div>
</template>
