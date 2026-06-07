<script setup lang="ts">
/**
 * List aggregator (Wave 3.2 / Tab D).
 * 14/14 React-Demos covered. Vue does not expose a compound
 * `List.Item` / `List.Item.Meta` API — the same row layout is composed
 * inline via the default slot.
 */
import { computed } from 'vue'
import {
  ComponentDoc,
  DemoBox,
  PropsTable,
  CssVarsTable,
  type PropDef,
  type CssVarDef,
} from './components'
import { useListDocStrings } from './list-doc/useStrings'

import BasicList from './list/Basic.demo.vue'
import BasicSource from './list/Basic.demo.vue?raw'
import SizesList from './list/Sizes.demo.vue'
import SizesSource from './list/Sizes.demo.vue?raw'
import WithMetaList from './list/WithMeta.demo.vue'
import WithMetaSource from './list/WithMeta.demo.vue?raw'
import GridList from './list/Grid.demo.vue'
import GridSource from './list/Grid.demo.vue?raw'
import PaginationList from './list/Pagination.demo.vue'
import PaginationSource from './list/Pagination.demo.vue?raw'
import LoadingList from './list/Loading.demo.vue'
import LoadingSource from './list/Loading.demo.vue?raw'
import EmptyList from './list/Empty.demo.vue'
import EmptySource from './list/Empty.demo.vue?raw'
import SelectableList from './list/Selectable.demo.vue'
import SelectableSource from './list/Selectable.demo.vue?raw'
import DraggableList from './list/Draggable.demo.vue'
import DraggableSource from './list/Draggable.demo.vue?raw'
import VirtualList from './list/Virtual.demo.vue'
import VirtualSource from './list/Virtual.demo.vue?raw'
import RowClassNameList from './list/RowClassName.demo.vue'
import RowClassNameSource from './list/RowClassName.demo.vue?raw'
import SlotsList from './list/Slots.demo.vue'
import SlotsSource from './list/Slots.demo.vue?raw'
import TokensOverrideList from './list/TokensOverride.demo.vue'
import TokensOverrideSource from './list/TokensOverride.demo.vue?raw'
import UnstyledList from './list/Unstyled.demo.vue'
import UnstyledSource from './list/Unstyled.demo.vue?raw'

const t = useListDocStrings()

const listProps = computed<PropDef[]>(() => [
  { name: 'dataSource', description: t.value.propDataSource, type: 'T[]', required: true },
  { name: 'header', description: t.value.propHeader, type: 'string' },
  { name: 'footer', description: t.value.propFooter, type: 'string' },
  { name: 'loading', description: t.value.propLoading, type: 'boolean', default: 'false' },
  { name: 'bordered', description: t.value.propBordered, type: 'boolean', default: 'false' },
  { name: 'split', description: t.value.propSplit, type: 'boolean', default: 'true' },
  { name: 'hoverable', description: t.value.propHoverable, type: 'boolean', default: 'true' },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'default' | 'large'",
    default: "'default'",
  },
  { name: 'pagination', description: t.value.propPagination, type: 'false | ListPaginationConfig' },
  { name: 'grid', description: t.value.propGrid, type: 'ListGridConfig' },
  { name: 'virtual', description: t.value.propVirtual, type: 'ListVirtualConfig' },
  { name: 'locale', description: t.value.propLocale, type: 'ListLocale' },
  { name: 'selectable', description: t.value.propSelectable, type: 'boolean', default: 'false' },
  { name: 'multiSelect', description: t.value.propMultiSelect, type: 'boolean', default: 'false' },
  { name: 'selectedKeys', description: t.value.propSelectedKeys, type: 'number[]' },
  { name: 'defaultSelectedKeys', description: t.value.propDefaultSelectedKeys, type: 'number[]' },
  {
    name: '@selectionChange',
    description: t.value.propEmitSelectionChange,
    type: '(keys, items) => void',
  },
  { name: 'draggable', description: t.value.propDraggable, type: 'boolean', default: 'false' },
  { name: '@reorder', description: t.value.propEmitReorder, type: '(from, to) => void' },
  { name: '@itemClick', description: t.value.propEmitItemClick, type: '(item, index) => void' },
  { name: '@pageChange', description: t.value.propEmitPageChange, type: '(page, size) => void' },
  {
    name: 'rowClassName',
    description: t.value.propRowClassName,
    type: 'string | (item, i) => string',
  },
  { name: 'classNames', description: t.value.propClassNames, type: 'ListClassNames' },
  { name: 'styles', description: t.value.propStyles, type: 'ListStyles' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
])

const listCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg', default: '#ffffff', description: t.value.cssSgColorBg },
  { name: 'sg-color-bg-secondary', default: '#fafafa', description: t.value.cssSgColorBgSecondary },
  {
    name: 'sg-color-bg-hover',
    default: 'var(--sg-gray-3)',
    description: t.value.cssSgColorBgHover,
  },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: t.value.cssSgColorBorder },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssSgColorTextSecondary,
  },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssSgColorPrimary },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssSgBorderRadius },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssSgFontSizeLg },
  { name: 'sg-line-height', default: '1.5714', description: t.value.cssSgLineHeight },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssSgPaddingSm },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssSgPaddingMd },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssSgPaddingLg },
  { name: 'sg-padding-xl', default: '20px', description: t.value.cssSgPaddingXl },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssSgMarginXs },
  {
    name: 'sg-transition-duration',
    default: '0.18s',
    description: t.value.cssSgTransitionDuration,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbDataDisplay, t.crumbList]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" vertical>
      <BasicList />
    </DemoBox>
    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource" vertical>
      <SizesList />
    </DemoBox>
    <DemoBox
      :title="t.demoWithMetaTitle"
      :description="t.demoWithMetaDesc"
      :code="WithMetaSource"
      vertical
    >
      <WithMetaList />
    </DemoBox>
    <DemoBox :title="t.demoGridTitle" :description="t.demoGridDesc" :code="GridSource" vertical>
      <GridList />
    </DemoBox>
    <DemoBox
      :title="t.demoPaginationTitle"
      :description="t.demoPaginationDesc"
      :code="PaginationSource"
      vertical
    >
      <PaginationList />
    </DemoBox>
    <DemoBox
      :title="t.demoLoadingTitle"
      :description="t.demoLoadingDesc"
      :code="LoadingSource"
      vertical
    >
      <LoadingList />
    </DemoBox>
    <DemoBox :title="t.demoEmptyTitle" :description="t.demoEmptyDesc" :code="EmptySource" vertical>
      <EmptyList />
    </DemoBox>
    <DemoBox
      :title="t.demoSelectableTitle"
      :description="t.demoSelectableDesc"
      :code="SelectableSource"
      vertical
    >
      <SelectableList />
    </DemoBox>
    <DemoBox
      :title="t.demoDraggableTitle"
      :description="t.demoDraggableDesc"
      :code="DraggableSource"
      vertical
    >
      <DraggableList />
    </DemoBox>
    <DemoBox
      :title="t.demoVirtualTitle"
      :description="t.demoVirtualDesc"
      :code="VirtualSource"
      vertical
    >
      <VirtualList />
    </DemoBox>
    <DemoBox
      :title="t.demoRowClassNameTitle"
      :description="t.demoRowClassNameDesc"
      :code="RowClassNameSource"
      vertical
    >
      <RowClassNameList />
    </DemoBox>
    <DemoBox :title="t.demoSlotsTitle" :description="t.demoSlotsDesc" :code="SlotsSource" vertical>
      <SlotsList />
    </DemoBox>
    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
      vertical
    >
      <TokensOverrideList />
    </DemoBox>
    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
      vertical
    >
      <UnstyledList />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableListApi" :data="listProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="listCssVars" />
    </template>
  </ComponentDoc>
</template>
