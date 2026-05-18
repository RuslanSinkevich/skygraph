<script setup lang="ts">
import { ref } from 'vue'
import { SgTabs, SgNotificationContainer, type TabItem } from '@skygraph/vue'
import { useAppLocale } from '../_shared'
import BasicTab from './BasicTab.vue'
import ValidationTab from './ValidationTab.vue'
import LayoutsTab from './LayoutsTab.vue'
import DynamicTab from './DynamicTab.vue'
import SchemaTab from './SchemaTab.vue'
import { formsStyles } from './styles'

const l = useAppLocale('forms')
const active = ref('basic')

const tabs: TabItem[] = [
  { key: 'basic', label: l.tabs.basic },
  { key: 'validation', label: l.tabs.validation },
  { key: 'layouts', label: l.tabs.layouts },
  { key: 'dynamic', label: l.tabs.dynamic },
  { key: 'schema', label: l.tabs.schema },
]
</script>

<template>
  <div class="sc-content" style="flex: 1">
    <SgNotificationContainer />
    <component is="style" v-html="formsStyles" />
    <SgTabs :items="tabs" :active-key="active" @change="(k) => (active = String(k))">
      <template #panel="{ item }">
        <BasicTab v-if="item.key === 'basic'" />
        <ValidationTab v-else-if="item.key === 'validation'" />
        <LayoutsTab v-else-if="item.key === 'layouts'" />
        <DynamicTab v-else-if="item.key === 'dynamic'" />
        <SchemaTab v-else-if="item.key === 'schema'" />
      </template>
    </SgTabs>
  </div>
</template>
