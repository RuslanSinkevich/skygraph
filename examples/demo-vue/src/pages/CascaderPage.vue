<script setup lang="ts">
import { ref } from 'vue'
import { SgCascader } from '@skygraph/vue'
import ComponentDoc from '../components/ComponentDoc.vue'
import DemoBox from '../components/DemoBox.vue'
import PropsTable, { type PropDef } from '../components/PropsTable.vue'
import { useDemoStrings } from '../i18n'

const t = useDemoStrings({
  en: {
    title: 'Cascader',
    lead: 'Multi-column dropdown for picking a path through nested options.',
    when1: 'Address pickers, taxonomy / category trees, region selectors.',
    when2: 'Any data with deterministic depth (countries → states → cities).',
    basicTitle: 'Basic',
    basicDesc: 'Click an option to drill into the next column.',
    hoverTitle: 'Hover trigger',
    hoverDesc: 'Open subcolumns on hover instead of click.',
    changeOnSelectTitle: 'Change on select',
    changeOnSelectDesc: 'Allow selecting any non-leaf option.',
    searchTitle: 'Search',
    searchDesc: 'Allow text search inside the dropdown.',
    sizesTitle: 'Sizes',
    sizesDesc: 'Three size tokens.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Non-interactive read-only display.',
  },
  ru: {
    title: 'Cascader',
    lead: 'Многоколоночный dropdown для выбора пути по вложенным опциям.',
    when1: 'Выбор адреса, категорий, регионов.',
    when2: 'Данные с предсказуемой глубиной (страна → регион → город).',
    basicTitle: 'Basic',
    basicDesc: 'Клик по опции открывает следующую колонку.',
    hoverTitle: 'Триггер hover',
    hoverDesc: 'Открытие колонок по hover.',
    changeOnSelectTitle: 'changeOnSelect',
    changeOnSelectDesc: 'Можно выбрать промежуточную опцию.',
    searchTitle: 'Search',
    searchDesc: 'Поиск внутри dropdown.',
    sizesTitle: 'Размеры',
    sizesDesc: 'Три размера.',
    disabledTitle: 'Disabled',
    disabledDesc: 'Только для чтения.',
  },
})

const options = [
  {
    value: 'ru',
    label: 'Russia',
    children: [
      {
        value: 'msk',
        label: 'Moscow',
        children: [
          { value: 'cao', label: 'Central AO' },
          { value: 'sao', label: 'North AO' },
        ],
      },
      {
        value: 'spb',
        label: 'Saint Petersburg',
        children: [
          { value: 'cnt', label: 'Central' },
          { value: 'vas', label: 'Vasileostrovsky' },
        ],
      },
    ],
  },
  {
    value: 'us',
    label: 'United States',
    children: [
      {
        value: 'ca',
        label: 'California',
        children: [
          { value: 'sf', label: 'San Francisco' },
          { value: 'la', label: 'Los Angeles' },
        ],
      },
      {
        value: 'ny',
        label: 'New York',
        children: [
          { value: 'manh', label: 'Manhattan' },
          { value: 'brkl', label: 'Brooklyn' },
        ],
      },
    ],
  },
]

const v = ref<(string | number)[]>([])

const propsData: PropDef[] = [
  { name: 'options', description: 'Cascader option tree.', type: 'CascaderOption[]' },
  {
    name: 'modelValue / value',
    description: 'Path of values root → leaf.',
    type: '(string | number)[]',
  },
  {
    name: 'placeholder',
    description: 'Input placeholder.',
    type: 'string',
    default: "'Please select'",
  },
  {
    name: 'expandTrigger',
    description: 'When to open submenu.',
    type: "'click' | 'hover'",
    default: "'click'",
  },
  {
    name: 'changeOnSelect',
    description: 'Allow selecting any non-leaf.',
    type: 'boolean',
    default: 'false',
  },
  { name: 'showSearch', description: 'Allow text search.', type: 'boolean', default: 'false' },
  { name: 'allowClear', description: 'Show clear control.', type: 'boolean', default: 'true' },
  { name: 'displayRender', description: 'Custom display formatter.', type: '(labels) => string' },
  { name: 'disabled', description: 'Disable interaction.', type: 'boolean', default: 'false' },
  {
    name: 'size',
    description: 'Size token.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'unstyled', description: 'Strip built-in styling.', type: 'boolean', default: 'false' },
]

const BASIC = `<SgCascader :options="options" v-model="value" />`
const HOVER = `<SgCascader expand-trigger="hover" :options="options" />`
const COS = `<SgCascader change-on-select :options="options" />`
const SEARCH = `<SgCascader show-search :options="options" />`
const SIZES = `<SgCascader size="small"  :options="options" />
<SgCascader size="middle" :options="options" />
<SgCascader size="large"  :options="options" />`
const DISABLED = `<SgCascader disabled :options="options" :value="['ru', 'msk']" />`
</script>

<template>
  <ComponentDoc
    :title="t.title"
    badge="data-entry"
    :crumbs="['Data Entry', 'Cascader']"
    :description="t.lead"
    :when-to-use="[t.when1, t.when2]"
  >
    <DemoBox :title="t.basicTitle" :description="t.basicDesc" :code="BASIC">
      <SgCascader :options="options" v-model="v" />
      <span style="font-size: 12px; color: var(--sg-color-text-secondary)">value: {{ v }}</span>
    </DemoBox>

    <DemoBox :title="t.hoverTitle" :description="t.hoverDesc" :code="HOVER">
      <SgCascader expand-trigger="hover" :options="options" />
    </DemoBox>

    <DemoBox :title="t.changeOnSelectTitle" :description="t.changeOnSelectDesc" :code="COS">
      <SgCascader change-on-select :options="options" />
    </DemoBox>

    <DemoBox :title="t.searchTitle" :description="t.searchDesc" :code="SEARCH">
      <SgCascader show-search :options="options" />
    </DemoBox>

    <DemoBox :title="t.sizesTitle" :description="t.sizesDesc" :code="SIZES">
      <SgCascader size="small" :options="options" />
      <SgCascader size="middle" :options="options" />
      <SgCascader size="large" :options="options" />
    </DemoBox>

    <DemoBox :title="t.disabledTitle" :description="t.disabledDesc" :code="DISABLED">
      <SgCascader disabled :options="options" :value="['ru', 'msk']" />
    </DemoBox>

    <template #api>
      <PropsTable :data="propsData" />
    </template>
  </ComponentDoc>
</template>
