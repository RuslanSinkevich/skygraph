<script setup lang="ts">
/**
 * `inlineCollapsed` shrinks the sidebar to icons only (in React the
 * `icon` prop fills the rail). Vue `MenuItem` has no `icon` prop, so
 * the rail collapses to bullet markers — see findings.
 */
import { computed, ref } from 'vue'
import { SgMenu, SgButton } from '@skygraph/vue'
import { collapseItems } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { expand: 'Expand', collapse: 'Collapse' },
  ru: { expand: 'Раскрыть', collapse: 'Свернуть' },
} as const

const t = useDemoStrings(STRINGS)
const collapsed = ref(true)

const railStyle = computed(() => ({
  width: collapsed.value ? '64px' : '256px',
  transition: 'width .2s',
}))
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: flex-start">
    <div :style="railStyle">
      <SgMenu
        mode="inline"
        :inline-collapsed="collapsed"
        :items="collapseItems"
        :default-selected-keys="['home']"
      />
    </div>
    <SgButton @click="collapsed = !collapsed">
      {{ collapsed ? t.expand : t.collapse }}
    </SgButton>
  </div>
</template>
