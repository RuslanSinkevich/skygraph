<script setup lang="ts">
/**
 * Click is the natural trigger for action menus — users press the
 * button intentionally, then pick a row. Hover is best for always-
 * visible chrome like breadcrumb pop-outs.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    clickTrigger: 'Click trigger',
    hoverTrigger: 'Hover trigger',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    clickTrigger: 'По клику',
    hoverTrigger: 'По наведению',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

const t = useDemoStrings(STRINGS)
const items = computed(() => makeActionItems(t.value))
</script>

<template>
  <div style="display: flex; gap: 8px">
    <SgDropdown :items="items" trigger="click">
      <SgButton>{{ t.clickTrigger }}</SgButton>
    </SgDropdown>
    <SgDropdown :items="items" trigger="hover">
      <SgButton>{{ t.hoverTrigger }}</SgButton>
    </SgDropdown>
  </div>
</template>
