<script setup lang="ts">
/**
 * Breadcrumb has no component-specific tokens — it reads the text palette and
 * `--sg-color-primary` for link hover. Three scoped recipes — branded green,
 * dark field, glass pick — restyle the trail.
 *
 * Mirrors React `examples/demo/src/demos/breadcrumb/TokensOverride.demo.tsx`.
 */
import { computed } from 'vue'
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { home: 'Home', docs: 'Docs', current: 'Breadcrumb' },
  ru: { home: 'Главная', docs: 'Документация', current: 'Хлебные крошки' },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<BreadcrumbItem[]>(() => [
  { title: t.value.home, href: '#' },
  { title: t.value.docs, href: '#' },
  { title: t.value.current },
])
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgBreadcrumb :items="items" />
    </template>
  </TokenScopeCards>
</template>
