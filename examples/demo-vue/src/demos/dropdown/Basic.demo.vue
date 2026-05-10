<script setup lang="ts">
/**
 * Hover the trigger to reveal the menu. `@select` fires with the
 * item's `key`. Items with `disabled` can't be clicked; `danger`
 * paints the row in the error palette; `divider` renders a line.
 */
import { computed, ref } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    hoverMe: 'Hover me',
    lastAction: 'last action:',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    hoverMe: 'Наведите курсор',
    lastAction: 'последнее действие:',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    archive: 'В архив (скоро)',
    delete: 'Удалить…',
  },
} as const

const t = useDemoStrings(STRINGS)
const items = computed(() => makeActionItems(t.value))
const last = ref<string | null>(null)

function onSelect(key: string) {
  last.value = key
}
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <SgDropdown :items="items" @select="onSelect">
      <SgButton>{{ t.hoverMe }}</SgButton>
    </SgDropdown>
    <span v-if="last" style="font-size: 13px; color: var(--sg-color-text-secondary)">
      {{ t.lastAction }} <code>{{ last }}</code>
    </span>
  </div>
</template>
