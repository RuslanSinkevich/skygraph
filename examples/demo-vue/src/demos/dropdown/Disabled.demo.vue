<script setup lang="ts">
/**
 * `disabled` prevents the menu from opening and short-circuits
 * `@select`. The trigger's own click / hover state is untouched —
 * use it to handle the "try again later" hint.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    disabled: 'Disabled',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    disabled: 'Отключено',
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
  <SgDropdown :items="items" disabled>
    <SgButton disabled>{{ t.disabled }}</SgButton>
  </SgDropdown>
</template>
