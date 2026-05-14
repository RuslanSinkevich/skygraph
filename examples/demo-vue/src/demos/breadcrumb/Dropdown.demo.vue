<script setup lang="ts">
/**
 * The `item` slot replaces the default text — drop a Dropdown in to
 * open a sibling list. The classic "jump to another project" pattern
 * on deep paths.
 */
import { computed } from 'vue'
import { SgBreadcrumb, SgDropdown, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    alpha: 'Alpha',
    projects: 'Projects ▾',
    projectAlpha: 'Project Alpha',
    projectBeta: 'Project Beta',
    projectGamma: 'Project Gamma',
  },
  ru: {
    home: 'Главная',
    alpha: 'Alpha',
    projects: 'Проекты ▾',
    projectAlpha: 'Проект Alpha',
    projectBeta: 'Проект Beta',
    projectGamma: 'Проект Gamma',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<BreadcrumbItem[]>(() => [
  { title: t.value.home, href: '#' },
  { title: '__projects__' },
  { title: t.value.alpha },
])

const projects = computed(() => [
  { key: 'alpha', label: t.value.projectAlpha },
  { key: 'beta', label: t.value.projectBeta },
  { key: 'gamma', label: t.value.projectGamma },
])
</script>

<template>
  <SgBreadcrumb :items="items">
    <template #item="{ item }">
      <SgDropdown v-if="item.title === '__projects__'" :items="projects" trigger="click">
        <span style="cursor: pointer">{{ t.projects }}</span>
      </SgDropdown>
      <template v-else>{{ item.title }}</template>
    </template>
  </SgBreadcrumb>
</template>
