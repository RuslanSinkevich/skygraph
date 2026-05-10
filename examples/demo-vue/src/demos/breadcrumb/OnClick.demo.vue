<script setup lang="ts">
/**
 * Use the `@itemClick` emit to intercept navigation for SPA routers.
 * Vue's `BreadcrumbItem` does not have a per-item `onClick` prop —
 * the parent component dispatches the click + index instead.
 */
import { ref } from 'vue'
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    log: 'Last click:',
    none: '— none yet',
    home: 'Home',
    docs: 'Docs',
    current: 'Routing',
  },
  ru: {
    log: 'Последний клик:',
    none: '— пока нет',
    home: 'Главная',
    docs: 'Документация',
    current: 'Роутинг',
  },
} as const

const t = useDemoStrings(STRINGS)
const lastClick = ref<string>('')

function handleClick(item: BreadcrumbItem, index: number) {
  lastClick.value = `${item.title} (#${index})`
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <SgBreadcrumb
      :items="[
        { title: t.home, href: '#' },
        { title: t.docs, href: '#docs' },
        { title: t.current },
      ] as BreadcrumbItem[]"
      @item-click="handleClick"
    />
    <small style="color: var(--sg-color-text-secondary)">
      {{ t.log }} {{ lastClick || t.none }}
    </small>
  </div>
</template>
