<script setup lang="ts">
/**
 * Four corners are available. `bottomLeft` aligns the menu's left
 * edge with the trigger (default), `bottomRight` aligns the right
 * edge — pick the side that keeps the menu inside the viewport.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    bottomLeft: 'bottomLeft',
    bottomRight: 'bottomRight',
    topLeft: 'topLeft',
    topRight: 'topRight',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    bottomLeft: 'снизу слева',
    bottomRight: 'снизу справа',
    topLeft: 'сверху слева',
    topRight: 'сверху справа',
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
  <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 8px; justify-content: start">
    <SgDropdown :items="items" placement="bottomLeft">
      <SgButton>{{ t.bottomLeft }}</SgButton>
    </SgDropdown>
    <SgDropdown :items="items" placement="bottomRight">
      <SgButton>{{ t.bottomRight }}</SgButton>
    </SgDropdown>
    <SgDropdown :items="items" placement="topLeft">
      <SgButton>{{ t.topLeft }}</SgButton>
    </SgDropdown>
    <SgDropdown :items="items" placement="topRight">
      <SgButton>{{ t.topRight }}</SgButton>
    </SgDropdown>
  </div>
</template>
