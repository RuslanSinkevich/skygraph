<script setup lang="ts">
/**
 * `unstyled` drops the sg-dropdown classes and leaves you with a
 * `<div>` + `<hr>` skeleton. The behaviour (open / close, hover
 * handling, `@select`) stays — you bring your own styling.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    trigger: 'Unstyled trigger',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    trigger: 'Триггер без стилей',
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
  <SgDropdown unstyled :items="items" trigger="click">
    <SgButton>{{ t.trigger }}</SgButton>
  </SgDropdown>
</template>
