<script setup lang="ts">
/**
 * Put any icon node as the first child. The button uses flex with
 * `gap: --sg-padding-xs` so icon and label stay aligned across
 * all three sizes. In Vue we use the default slot — the same flex
 * layout takes care of alignment.
 */
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    newProject: 'New project',
    refresh: 'Refresh',
    remove: 'Remove',
    search: 'Search',
  },
  ru: {
    newProject: 'Новый проект',
    refresh: 'Обновить',
    remove: 'Удалить',
    search: 'Поиск',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center">
    <SgButton type="primary">
      <span aria-hidden>＋</span>
      {{ t.newProject }}
    </SgButton>
    <SgButton>
      <span aria-hidden>⟳</span>
      {{ t.refresh }}
    </SgButton>
    <SgButton type="text">
      <span aria-hidden>⌫</span>
      {{ t.remove }}
    </SgButton>
    <SgButton :aria-label="t.search" size="small">
      <span aria-hidden>🔍</span>
    </SgButton>
  </div>
</template>
