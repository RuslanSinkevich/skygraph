<script setup lang="ts">
/**
 * The `item` slot is a full template — combine icons with text to
 * help people spot the level at a glance. Keep icons aria-hidden so
 * screen readers only announce the text label.
 */
import { computed } from 'vue'
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    projects: 'Projects',
  },
  ru: {
    home: 'Главная',
    projects: 'Проекты',
  },
} as const

const t = useDemoStrings(STRINGS)

interface IconBreadcrumbItem extends BreadcrumbItem {
  icon?: string
}

const items = computed<IconBreadcrumbItem[]>(() => [
  { title: t.value.home, href: '#', icon: '🏠' },
  { title: t.value.projects, href: '#', icon: '📁' },
  { title: 'README.md', icon: '📄' },
])
</script>

<template>
  <SgBreadcrumb :items="items">
    <template #item="{ item }">
      <span v-if="(item as IconBreadcrumbItem).icon" aria-hidden="true" style="margin-right: 4px">
        {{ (item as IconBreadcrumbItem).icon }}
      </span>
      {{ item.title }}
    </template>
  </SgBreadcrumb>
</template>
