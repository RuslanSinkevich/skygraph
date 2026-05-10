<script setup lang="ts">
import { ref } from 'vue'
import { SgList } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'List',
    lead: 'Vertical collection of items with optional pagination, dividers, selection, and grid layout.',
    when1: 'Records, comments, notifications — anything where each entry is a small chunk.',
    when2: 'When you need consistent padding, dividers, or a header/footer band.',
    basicTitle: 'Basic',
    basicDesc: 'Default rendering with `dataSource` and a default slot.',
    splitTitle: 'No split',
    splitDesc: 'Hide dividers between items.',
    borderedTitle: 'Bordered',
    borderedDesc: 'Outline the list container.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three densities — small / default / large.',
    selectableTitle: 'Selectable',
    selectableDesc: 'Click a row to select it (Ctrl+click for multi).',
    paginationTitle: 'Pagination',
    paginationDesc: 'Built-in page navigator under the list.',
  },
  ru: {
    title: 'List',
    lead: 'Вертикальная коллекция элементов: пагинация, разделители, выбор, grid-режим.',
    when1: 'Записи, комментарии, уведомления — там, где каждый элемент короткий.',
    when2: 'Когда нужны одинаковые отступы, разделители, header/footer.',
    basicTitle: 'Basic',
    basicDesc: 'Дефолтный рендер с `dataSource` и дефолтным слотом.',
    splitTitle: 'Без разделителей',
    splitDesc: 'Скрыть разделители между элементами.',
    borderedTitle: 'С рамкой',
    borderedDesc: 'Обвести контейнер.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три плотности — small / default / large.',
    selectableTitle: 'С выбором',
    selectableDesc: 'Клик по строке выбирает её (Ctrl+клик — мульти).',
    paginationTitle: 'Пагинация',
    paginationDesc: 'Встроенная пагинация под списком.',
  },
})

interface Item {
  id: number
  title: string
  meta: string
}

const items: Item[] = [
  { id: 1, title: 'Quarterly report', meta: 'Updated 2h ago' },
  { id: 2, title: 'Production rollout', meta: 'Updated yesterday' },
  { id: 3, title: 'Customer feedback', meta: 'Updated 3d ago' },
  { id: 4, title: 'Roadmap revision', meta: 'Updated 1w ago' },
]

const longItems: Item[] = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  meta: `Row #${i + 1}`,
}))

const selected = ref<number[]>([])

const propsData: PropDef[] = [
  { name: 'dataSource', description: 'Items to render.', type: 'T[]' },
  {
    name: 'header / footer',
    description: 'Plain text header/footer (use slots for VNode).',
    type: 'string',
  },
  { name: 'loading', description: 'Loading state wrapper.', type: 'boolean', default: 'false' },
  {
    name: 'pagination',
    description: 'Page config or `false`.',
    type: 'false | ListPaginationConfig',
    default: 'false',
  },
  { name: 'grid', description: 'CSS-grid layout for items.', type: 'ListGridConfig' },
  {
    name: 'size',
    description: 'Density.',
    type: "'small' | 'default' | 'large'",
    default: "'default'",
  },
  { name: 'split', description: 'Show dividers.', type: 'boolean', default: 'true' },
  { name: 'bordered', description: 'Outlined container.', type: 'boolean', default: 'false' },
  { name: 'selectable', description: 'Click to select rows.', type: 'boolean', default: 'false' },
  {
    name: 'multiSelect',
    description: 'Allow Ctrl/Cmd multi-select.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'draggable', description: 'Drag-and-drop reorder.', type: 'boolean', default: 'false' },
  { name: 'virtual', description: 'Virtual scrolling.', type: 'ListVirtualConfig' },
  { name: 'unstyled', description: 'Strip Skygraph styles.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgList :data-source="items" v-slot="{ item }">
  <strong>{{ item.title }}</strong> — {{ item.meta }}
</SgList>`

const SPLIT = `<SgList :data-source="items" :split="false" />`
const BORDERED = `<SgList bordered :data-source="items" />`
const SIZES = `<SgList size="small"   :data-source="items" />
<SgList size="default" :data-source="items" />
<SgList size="large"   :data-source="items" />`

const SELECTABLE = `<SgList
  selectable
  multi-select
  :data-source="items"
  :selected-keys="selected"
  @selectionChange="(k) => (selected = k)"
/>`

const PAGINATION = `<SgList
  bordered
  :data-source="items"
  :pagination="{ pageSize: 5 }"
/>`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-display"
    :crumbs="['Data Display', 'List']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgList :data-source="items">
        <template #default="{ item }">
          <div>
            <strong>{{ item.title }}</strong>
            <span style="color: var(--sg-color-text-secondary); margin-left: 8px">{{
              item.meta
            }}</span>
          </div>
        </template>
      </SgList>
    </DemoBox>

    <DemoBox :title="t.splitTitle" :description="t.splitDesc" :code="SPLIT">
      <SgList :data-source="items" :split="false">
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
    </DemoBox>

    <DemoBox :title="t.borderedTitle" :description="t.borderedDesc" :code="BORDERED">
      <SgList bordered :data-source="items">
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgList size="small" :data-source="items">
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
      <SgList size="default" :data-source="items">
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
      <SgList size="large" :data-source="items">
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
    </DemoBox>

    <DemoBox :title="t.selectableTitle" :description="t.selectableDesc" :code="SELECTABLE">
      <SgList
        selectable
        :multi-select="true"
        :data-source="items"
        :selected-keys="selected"
        @selectionChange="(k: number[]) => (selected = k)"
      >
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)"
        >selected: {{ selected }}</span
      >
    </DemoBox>

    <DemoBox :title="t.paginationTitle" :description="t.paginationDesc" :code="PAGINATION">
      <SgList bordered :data-source="longItems" :pagination="{ pageSize: 5 }">
        <template #default="{ item }">{{ item.title }}</template>
      </SgList>
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
