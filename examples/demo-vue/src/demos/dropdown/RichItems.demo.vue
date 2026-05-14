<script setup lang="ts">
/**
 * `#item` slot lets you render any VNode for a row — pair an icon with a
 * description, or render two lines with a shortcut on the right. Keep rows
 * short; if you need sections use dividers.
 */
import { computed } from 'vue'
import { SgDropdown, SgButton } from '@skygraph/vue'
import type { DropdownItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    newFile: 'New file',
    open: 'Open…',
    save: 'Save',
    saveAs: 'Save as…',
    closeWindow: 'Close window',
    fileMenu: 'File ▾',
  },
  ru: {
    newFile: 'Новый файл',
    open: 'Открыть…',
    save: 'Сохранить',
    saveAs: 'Сохранить как…',
    closeWindow: 'Закрыть окно',
    fileMenu: 'Файл ▾',
  },
} as const

interface RichMeta {
  icon: string
  shortcut: string
}
type RichItem = DropdownItem & { meta?: RichMeta }

const t = useDemoStrings(STRINGS)

const items = computed<RichItem[]>(() => [
  { key: 'new', label: t.value.newFile, meta: { icon: '📄', shortcut: '⌘ N' } },
  { key: 'open', label: t.value.open, meta: { icon: '📂', shortcut: '⌘ O' } },
  { key: 'd1', label: '', divider: true },
  { key: 'save', label: t.value.save, meta: { icon: '💾', shortcut: '⌘ S' } },
  { key: 'save-as', label: t.value.saveAs, meta: { icon: '💾', shortcut: '⇧ ⌘ S' } },
  { key: 'd2', label: '', divider: true },
  { key: 'close', label: t.value.closeWindow, danger: true, meta: { icon: '✕', shortcut: '⌘ W' } },
])

function metaOf(item: DropdownItem): RichMeta | undefined {
  return (item as RichItem).meta
}
</script>

<template>
  <SgDropdown :items="items" trigger="click">
    <SgButton>{{ t.fileMenu }}</SgButton>
    <template #item="{ item }">
      <div
        v-if="metaOf(item)"
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: space-between;
          min-width: 180px;
        "
      >
        <span style="display: inline-flex; gap: 8px; align-items: center">
          <span aria-hidden="true">{{ metaOf(item)!.icon }}</span>
          <span>{{ item.label }}</span>
        </span>
        <kbd style="font-size: 11px; opacity: 0.7">{{ metaOf(item)!.shortcut }}</kbd>
      </div>
      <template v-else>{{ item.label }}</template>
    </template>
  </SgDropdown>
</template>
