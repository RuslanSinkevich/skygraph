<script setup lang="ts">
/**
 * Controlled — the parent keeps `selectedKeys` and `openKeys` in sync.
 * Useful when selection comes from the URL or a remote store.
 */
import { computed, ref } from 'vue'
import { SgMenu, SgButton } from '@skygraph/vue'
import { sidebarItems } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    selected: 'Selected',
    open: 'Open',
    none: '—',
    jumpBilling: 'Jump to Billing',
    expandAll: 'Expand all submenus',
  },
  ru: {
    selected: 'Выбрано',
    open: 'Открыто',
    none: '—',
    jumpBilling: 'К Billing',
    expandAll: 'Открыть все сабменю',
  },
} as const

const t = useDemoStrings(STRINGS)
const selected = ref<string[]>(['projects'])
const open = ref<string[]>(['team'])

const selectedLabel = computed(() => selected.value.join(', ') || t.value.none)
const openLabel = computed(() => open.value.join(', ') || t.value.none)

function onSelect(info: { key: string; selectedKeys: string[] }) {
  selected.value = info.selectedKeys
}

function onOpenChange(keys: string[]) {
  open.value = keys
}
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: flex-start">
    <div style="max-width: 256px; flex: 1">
      <SgMenu
        mode="inline"
        :items="sidebarItems"
        :selected-keys="selected"
        :open-keys="open"
        @select="onSelect"
        @open-change="onOpenChange"
      />
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px; min-width: 200px">
      <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
        <div>{{ t.selected }}: {{ selectedLabel }}</div>
        <div>{{ t.open }}: {{ openLabel }}</div>
      </div>
      <SgButton size="small" @click="selected = ['billing']">{{ t.jumpBilling }}</SgButton>
      <SgButton size="small" @click="open = ['team', 'settings']">{{ t.expandAll }}</SgButton>
    </div>
  </div>
</template>
