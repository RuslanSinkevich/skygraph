<script setup lang="ts">
import { ref } from 'vue'
import { SgPagination } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Pagination',
    lead: 'Page navigator with optional total label, size changer and quick jump.',
    when1: 'Long lists / tables broken into pages.',
    when2: 'Use `simple` for compact mobile layouts.',
    basicTitle: 'Basic',
    basicDesc: 'Plain page navigator.',
    fullTitle: 'Full controls',
    fullDesc: 'showTotal + sizeChanger + quickJumper.',
    simpleTitle: 'Simple',
    simpleDesc: 'Prev / next + current/total only.',
  },
  ru: {
    title: 'Pagination',
    lead: 'Пагинация с опциональным total, выбором размера и quick jump.',
    when1: 'Длинные списки и таблицы разбиты на страницы.',
    when2: '`simple` для компактных мобильных раскладок.',
    basicTitle: 'Basic',
    basicDesc: 'Базовый навигатор страниц.',
    fullTitle: 'Полные контролы',
    fullDesc: 'showTotal + sizeChanger + quickJumper.',
    simpleTitle: 'Simple',
    simpleDesc: 'Только prev / next + current/total.',
  },
})

const page1 = ref(2)
const page2 = ref(1)
const page3 = ref(3)
const size = ref(10)

const propsData: PropDef[] = [
  { name: 'current', description: 'Current page (1-based).', type: 'number', required: true },
  { name: 'total', description: 'Total record count.', type: 'number', required: true },
  { name: 'pageSize', description: 'Items per page.', type: 'number', default: '10' },
  { name: 'showTotal', description: 'Show total label.', type: 'boolean', default: 'false' },
  { name: 'simple', description: 'Render as prev/next + current/total only.', type: 'boolean', default: 'false' },
  { name: 'showSizeChanger', description: 'Render page size select.', type: 'boolean', default: 'false' },
  { name: 'showQuickJumper', description: 'Render quick jump input.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgPagination v-model:current="page" :total="120" />`
const FULL = `<SgPagination v-model:current="page" :total="220" :page-size="size" show-total show-size-changer show-quick-jumper />`
const SIMPLE = `<SgPagination v-model:current="page" simple :total="80" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="navigation"
    :crumbs="['Navigation', 'Pagination']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC" vertical>
      <SgPagination
        :current="page1"
        :total="120"
        @change="(p: number) => (page1 = p)"
      />
    </DemoBox>

    <DemoBox :title="t.fullTitle" :description="t.fullDesc" :code="FULL" vertical>
      <SgPagination
        :current="page2"
        :total="220"
        :page-size="size"
        show-total
        show-size-changer
        show-quick-jumper
        @change="(p: number) => (page2 = p)"
        @page-size-change="(s: number) => (size = s)"
      />
    </DemoBox>

    <DemoBox :title="t.simpleTitle" :description="t.simpleDesc" :code="SIMPLE" vertical>
      <SgPagination
        :current="page3"
        simple
        :total="80"
        @change="(p: number) => (page3 = p)"
      />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
