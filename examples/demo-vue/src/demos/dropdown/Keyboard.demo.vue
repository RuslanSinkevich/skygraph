<script setup lang="ts">
/**
 * Keyboard support is baked in: Tab to focus the trigger, Space /
 * Enter to open, ↑ / ↓ to move focus (skipping disabled + dividers),
 * Enter to activate, Esc to close.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import { makeActionItems } from './data'

const STRINGS = {
  en: {
    button: 'Tab here, then Space',
    hint: 'Try',
    edit: 'Edit',
    duplicate: 'Duplicate',
    archive: 'Archive (soon)',
    delete: 'Delete…',
  },
  ru: {
    button: 'Tab сюда, затем Space',
    hint: 'Попробуйте',
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
  <div style="display: flex; flex-direction: column; gap: 8px">
    <SgDropdown :items="items" trigger="click">
      <SgButton>{{ t.button }}</SgButton>
    </SgDropdown>
    <p style="margin: 0; font-size: 12px; color: var(--sg-color-text-secondary)">
      {{ t.hint }} <kbd>Tab</kbd> → <kbd>Space</kbd> → <kbd>↓</kbd> → <kbd>Enter</kbd>
    </p>
  </div>
</template>
