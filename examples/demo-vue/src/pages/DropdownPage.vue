<script setup lang="ts">
import { ref } from 'vue'
import { SgButton, SgDropdown, type DropdownItem } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Dropdown',
    lead: 'Floating menu attached to a trigger element. Click or hover, four placements, danger / divider items.',
    when1: 'Compact "more actions" menu next to a primary button.',
    when2: 'Context menus on cards, table rows, list items.',
    basicTitle: 'Basic',
    basicDesc: 'Hover trigger, default placement (bottomLeft).',
    clickTitle: 'Click trigger',
    clickDesc: 'Use `trigger="click"` for explicit toggling.',
    placementTitle: 'Placement',
    placementDesc: 'Four corners — top/bottom × left/right.',
    statesTitle: 'Item states',
    statesDesc: 'Disabled, danger, divider modifiers.',
  },
  ru: {
    title: 'Dropdown',
    lead: 'Плавающее меню у триггера. Click или hover, четыре направления, danger / divider.',
    when1: 'Компактное «больше действий» рядом с основной кнопкой.',
    when2: 'Контекстные меню на карточках, строках таблиц, элементах списков.',
    basicTitle: 'Basic',
    basicDesc: 'Триггер hover, направление по умолчанию (bottomLeft).',
    clickTitle: 'Триггер по клику',
    clickDesc: '`trigger="click"` — явный переключатель.',
    placementTitle: 'Placement',
    placementDesc: 'Четыре угла — top/bottom × left/right.',
    statesTitle: 'Состояния пункта',
    statesDesc: 'Модификаторы disabled, danger, divider.',
  },
})

const last = ref<string>('—')

const items: DropdownItem[] = [
  { key: 'edit', label: 'Edit' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'archive', label: 'Archive' },
]

const itemsRich: DropdownItem[] = [
  { key: 'open', label: 'Open' },
  { key: 'rename', label: 'Rename' },
  { key: 'd1', label: '', divider: true },
  { key: 'lock', label: 'Lock', disabled: true },
  { key: 'delete', label: 'Delete', danger: true },
]

function onSelect(k: string) {
  last.value = k
}

const propsData: PropDef[] = [
  { name: 'items', description: 'Menu rows.', type: 'DropdownItem[]', required: true },
  {
    name: 'trigger',
    description: 'How the menu opens.',
    type: "'click' | 'hover'",
    default: "'hover'",
  },
  {
    name: 'placement',
    description: 'Corner the menu hugs.',
    type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'",
    default: "'bottomLeft'",
  },
  { name: 'disabled', description: 'Disable the trigger.', type: 'boolean', default: 'false' },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const itemPropsTable: PropDef[] = [
  { name: 'key', description: 'Unique key emitted on `select`.', type: 'string', required: true },
  { name: 'label', description: 'Visible row content.', type: 'string', required: true },
  { name: 'disabled', description: 'Row cannot be selected.', type: 'boolean', default: 'false' },
  { name: 'danger', description: 'Style as destructive.', type: 'boolean', default: 'false' },
  {
    name: 'divider',
    description: 'Render a separator instead of a row.',
    type: 'boolean',
    default: 'false',
  },
]

const BASIC = `<SgDropdown :items="items" @select="onSelect">
  <SgButton>Hover me</SgButton>
</SgDropdown>`
const CLICK = `<SgDropdown trigger="click" :items="items" @select="onSelect">
  <SgButton type="primary">Actions</SgButton>
</SgDropdown>`
const PLACEMENT = `<SgDropdown placement="bottomRight" :items="items">…</SgDropdown>`
const STATES = `<SgDropdown trigger="click" :items="[
  { key: 'open', label: 'Open' },
  { key: 'rename', label: 'Rename' },
  { key: 'd1', label: '', divider: true },
  { key: 'lock', label: 'Lock', disabled: true },
  { key: 'delete', label: 'Delete', danger: true },
]">…</SgDropdown>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Dropdown']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgDropdown :items="items" @select="onSelect">
        <SgButton>Hover me</SgButton>
      </SgDropdown>
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">last: {{ last }}</span>
    </DemoBox>

    <DemoBox :title="t.clickTitle" :description="t.clickDesc" :code="CLICK">
      <SgDropdown trigger="click" :items="items" @select="onSelect">
        <SgButton type="primary">Actions</SgButton>
      </SgDropdown>
    </DemoBox>

    <DemoBox :title="t.placementTitle" :description="t.placementDesc" :code="PLACEMENT">
      <SgDropdown placement="bottomLeft" :items="items">
        <SgButton>bottomLeft</SgButton>
      </SgDropdown>
      <SgDropdown placement="bottomRight" :items="items">
        <SgButton>bottomRight</SgButton>
      </SgDropdown>
      <SgDropdown placement="topLeft" :items="items">
        <SgButton>topLeft</SgButton>
      </SgDropdown>
      <SgDropdown placement="topRight" :items="items">
        <SgButton>topRight</SgButton>
      </SgDropdown>
    </DemoBox>

    <DemoBox :title="t.statesTitle" :description="t.statesDesc" :code="STATES">
      <SgDropdown trigger="click" :items="itemsRich" @select="onSelect">
        <SgButton>More</SgButton>
      </SgDropdown>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
      <PropsTable title="DropdownItem" :data="itemPropsTable" />
    </template>
  </ComponentDoc>
</template>
