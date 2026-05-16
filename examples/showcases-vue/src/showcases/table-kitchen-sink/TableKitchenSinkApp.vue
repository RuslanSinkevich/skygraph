<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgSegmented, SgNotificationContainer } from '@skygraph/vue'
import { sharedTableStyles } from './common'
import { useAppLocale } from '../_shared'
import BasicTab from './BasicTab.vue'
import SortingFilteringTab from './SortingFilteringTab.vue'
import EditingTab from './EditingTab.vue'
import VirtualTab from './VirtualTab.vue'
import PinnedTab from './PinnedTab.vue'
import GroupedTab from './GroupedTab.vue'

type TabKey = 'basic' | 'sort-filter' | 'editing' | 'virtual' | 'pinned' | 'grouped'

const l = useAppLocale('tableKitchenSink')
const activeTab = ref<TabKey>('basic')

function labelFor(key: TabKey): string {
  if (key === 'basic') return l.tabs.basic
  if (key === 'sort-filter') return l.tabs.sortFilter
  if (key === 'editing') return l.tabs.editing
  if (key === 'virtual') return l.tabs.virtual
  if (key === 'pinned') return l.tabs.pinned
  return l.tabs.grouped
}

const tabOptions = computed(() => [
  { label: labelFor('basic'), value: 'basic' },
  { label: labelFor('sort-filter'), value: 'sort-filter' },
  { label: labelFor('editing'), value: 'editing' },
  { label: labelFor('virtual'), value: 'virtual' },
  { label: labelFor('pinned'), value: 'pinned' },
  { label: labelFor('grouped'), value: 'grouped' },
])
</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1">
    <SgNotificationContainer />
    <div style="margin-bottom: 16px">
      <h2 style="margin: 0 0 4px; font-size: 18px">{{ l.appTitle }}</h2>
      <p style="margin: 0; color: var(--sg-color-text-secondary); font-size: 13px">
        {{ l.appLead }}
      </p>
    </div>
    <SgSegmented
      :value="activeTab"
      :options="tabOptions"
      @change="(v: string) => (activeTab = v as TabKey)"
    />
    <div style="margin-top: 16px; flex: 1">
      <BasicTab v-if="activeTab === 'basic'" />
      <SortingFilteringTab v-else-if="activeTab === 'sort-filter'" />
      <EditingTab v-else-if="activeTab === 'editing'" />
      <VirtualTab v-else-if="activeTab === 'virtual'" />
      <PinnedTab v-else-if="activeTab === 'pinned'" />
      <GroupedTab v-else-if="activeTab === 'grouped'" />
    </div>
    <component :is="'style'" v-html="sharedTableStyles" />
  </div>
</template>
