<script setup lang="ts">
/**
 * Dropdown has no component-specific tokens — it composes the surface and
 * hover globals; the danger row follows `--sg-color-error`. Three scoped
 * recipes — branded green, dark field, glass pick — restyle the menu.
 *
 * Mirrors React `examples/demo/src/demos/dropdown/TokensOverride.demo.tsx`.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton, type DropdownItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'

const STRINGS = {
  en: { button: 'Actions ▾', edit: 'Edit', duplicate: 'Duplicate', delete: 'Delete…' },
  ru: {
    button: 'Действия ▾',
    edit: 'Редактировать',
    duplicate: 'Дублировать',
    delete: 'Удалить…',
  },
} as const

const t = useDemoStrings(STRINGS)

const items = computed<DropdownItem[]>(() => [
  { key: '1', label: t.value.edit },
  { key: '2', label: t.value.duplicate },
  { key: 'd1', label: '', divider: true },
  { key: '3', label: t.value.delete, danger: true },
])
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgDropdown :items="items" trigger="click">
        <SgButton>{{ t.button }}</SgButton>
      </SgDropdown>
    </template>
  </TokenScopeCards>
</template>
