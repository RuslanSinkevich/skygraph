<script setup lang="ts">
import { SgTabs, type TabItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Tabs',
    lead: 'Tabbed navigation between sibling content panels.',
    when1: 'Switch between related views inside the same page region.',
    when2: 'Avoid for primary navigation — use Menu / sidebar instead.',
    cardTitle: 'Card (default)',
    cardDesc: 'Boxed tab strip.',
    lineTitle: 'Line type',
    lineDesc: 'Underline-only tab strip.',
    disabledTitle: 'Disabled / loading',
    disabledDesc: 'Per-tab disabled and loading states.',
  },
  ru: {
    title: 'Tabs',
    lead: 'Переключение между sibling-панелями контента.',
    when1: 'Связанные виды внутри одной области страницы.',
    when2: 'Не для главной навигации — берите Menu / sidebar.',
    cardTitle: 'Card (по умолчанию)',
    cardDesc: 'Боксы вкладок.',
    lineTitle: 'Тип Line',
    lineDesc: 'Только подчёркивание.',
    disabledTitle: 'Disabled / loading',
    disabledDesc: 'Состояния по таб-у.',
  },
})

const items: TabItem[] = [
  { key: 'a', label: 'Apples', content: 'Apples are red and crunchy.' },
  { key: 'b', label: 'Pears', content: 'Pears are smooth and sweet.' },
  { key: 'c', label: 'Bananas', content: 'Bananas are yellow.' },
]

const items2: TabItem[] = [
  { key: 'a', label: 'Active' },
  { key: 'b', label: 'Disabled', disabled: true },
  { key: 'c', label: 'Loading', loading: true },
]

const propsData: PropDef[] = [
  { name: 'items', description: 'Tab definitions.', type: 'TabItem[]', required: true },
  { name: 'type', description: 'Visual chrome.', type: "'line' | 'card'", default: "'card'" },
  { name: 'activeKey', description: 'Controlled active tab.', type: 'string' },
  { name: 'defaultActiveKey', description: 'Initial active tab.', type: 'string' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'" },
]

const CARD = `<SgTabs :items="items" />`
const LINE = `<SgTabs type="line" :items="items" />`
const STATES = `<SgTabs :items="items" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Tabs']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.cardTitle" :description="t.cardDesc" :code="CARD" vertical>
      <SgTabs :items="items" />
    </DemoBox>

    <DemoBox :title="t.lineTitle" :description="t.lineDesc" :code="LINE" vertical>
      <SgTabs type="line" :items="items" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="STATES" vertical>
      <SgTabs :items="items2" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
