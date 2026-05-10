<script setup lang="ts">
import { SgCollapse, type CollapseItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Collapse',
    lead: 'Group of expandable panels — show secondary detail without crowding the page.',
    when1: 'FAQ-style content with one item per question.',
    when2: 'Settings or filter groups with optional advanced sections.',
    basicTitle: 'Basic',
    basicDesc: 'Multiple panels open simultaneously by default.',
    accordionTitle: 'Accordion',
    accordionDesc: 'Only one panel open at a time.',
    ghostTitle: 'Ghost',
    ghostDesc: 'Borderless / transparent style.',
    iconEndTitle: 'Icon at the end',
    iconEndDesc: 'Move the expand chevron to the right.',
  },
  ru: {
    title: 'Collapse',
    lead: 'Группа разворачиваемых панелей — детали без перегрузки страницы.',
    when1: 'FAQ-стиль с одним вопросом на панель.',
    when2: 'Группы настроек / фильтров с опциональными разделами.',
    basicTitle: 'Basic',
    basicDesc: 'По умолчанию несколько панелей открыты одновременно.',
    accordionTitle: 'Accordion',
    accordionDesc: 'Открыта только одна панель.',
    ghostTitle: 'Ghost',
    ghostDesc: 'Без рамки и прозрачный фон.',
    iconEndTitle: 'Иконка справа',
    iconEndDesc: 'Шеврон уезжает в правый край.',
  },
})

const items: CollapseItem[] = [
  {
    key: '1',
    label: 'What is SkyGraph?',
    content: 'A reactive UI library with framework-agnostic core and styled components.',
  },
  {
    key: '2',
    label: 'Does it work with Vue?',
    content: 'Yes — Vue 3 adapter mirrors the React API and emits the same .sg-* classes.',
  },
  {
    key: '3',
    label: 'How is theming done?',
    content: 'Pure CSS variables. Switch dark mode with data-sg-theme on <html>.',
  },
]

const propsData: PropDef[] = [
  {
    name: 'items',
    description: 'Panels in display order.',
    type: 'CollapseItem[]',
    required: true,
  },
  { name: 'activeKey', description: 'Controlled open keys.', type: 'string | string[]' },
  { name: 'defaultActiveKey', description: 'Initial open keys.', type: 'string | string[]' },
  {
    name: 'accordion',
    description: 'Only one panel open at a time.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'bordered', description: 'Draw a border.', type: 'boolean', default: 'true' },
  {
    name: 'expandIconPosition',
    description: 'Placement of expand icon.',
    type: "'start' | 'end'",
    default: "'start'",
  },
  { name: 'ghost', description: 'Transparent style.', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Size token.', type: "'small' | 'middle' | 'large'" },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const itemPropsTable: PropDef[] = [
  { name: 'key', description: 'Unique panel key.', type: 'string', required: true },
  { name: 'label', description: 'Header text.', type: 'string', required: true },
  { name: 'content', description: 'Body text.', type: 'string', required: true },
  { name: 'extra', description: 'Optional content next to header.', type: 'string' },
  {
    name: 'showArrow',
    description: 'Show the expand/collapse arrow.',
    type: 'boolean',
    default: 'true',
  },
  { name: 'disabled', description: 'Panel cannot be toggled.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgCollapse :items="items" :default-active-key="['1']" />`
const ACCORDION = `<SgCollapse accordion :items="items" />`
const GHOST = `<SgCollapse ghost :items="items" />`
const ICON_END = `<SgCollapse expand-icon-position="end" :items="items" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'Collapse']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgCollapse :items="items" :default-active-key="['1']" />
    </DemoBox>

    <DemoBox :title="t.accordionTitle" :description="t.accordionDesc" :code="ACCORDION" vertical>
      <SgCollapse accordion :items="items" />
    </DemoBox>

    <DemoBox :title="t.ghostTitle" :description="t.ghostDesc" :code="GHOST" vertical>
      <SgCollapse ghost :items="items" />
    </DemoBox>

    <DemoBox :title="t.iconEndTitle" :description="t.iconEndDesc" :code="ICON_END" vertical>
      <SgCollapse expand-icon-position="end" :items="items" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="CollapseItem" :data="itemPropsTable" />
    </template>
  </ComponentDoc>
</template>
