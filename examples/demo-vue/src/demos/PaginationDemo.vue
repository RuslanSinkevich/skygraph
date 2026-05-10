<script setup lang="ts">
/**
 * `PaginationDemo` — aggregator for the Pagination component page.
 *
 * Mirrors `examples/demo/src/demos/PaginationDemo.tsx` 1:1 with one
 * Vue-specific delta: `showTotal` is `boolean` only (React also accepts
 * a `(total, [from, to]) => ReactNode` callback). The localised
 * "Total N" prefix is read from `SgConfigProvider.locale.pagination`.
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

import { usePaginationDocStrings } from './pagination-doc/useStrings'

import BasicPagination from './pagination/Basic.demo.vue'
import BasicSource from './pagination/Basic.demo.vue?raw'
import ManyPagesPagination from './pagination/ManyPages.demo.vue'
import ManyPagesSource from './pagination/ManyPages.demo.vue?raw'
import SimplePagination from './pagination/Simple.demo.vue'
import SimpleSource from './pagination/Simple.demo.vue?raw'
import ShowTotalPagination from './pagination/ShowTotal.demo.vue'
import ShowTotalSource from './pagination/ShowTotal.demo.vue?raw'
import SizeChangerPagination from './pagination/SizeChanger.demo.vue'
import SizeChangerSource from './pagination/SizeChanger.demo.vue?raw'
import DisabledPagination from './pagination/Disabled.demo.vue'
import DisabledSource from './pagination/Disabled.demo.vue?raw'
import TokensOverridePagination from './pagination/TokensOverride.demo.vue'
import TokensOverrideSource from './pagination/TokensOverride.demo.vue?raw'
import UnstyledPagination from './pagination/Unstyled.demo.vue'
import UnstyledSource from './pagination/Unstyled.demo.vue?raw'

const t = usePaginationDocStrings()

const paginationProps = computed<PropDef[]>(() => [
  { name: 'current', description: t.value.propCurrent, type: 'number', required: true },
  { name: 'total', description: t.value.propTotal, type: 'number', required: true },
  { name: 'pageSize', description: t.value.propPageSize, type: 'number', default: '10' },
  { name: 'showTotal', description: t.value.propShowTotal, type: 'boolean', default: 'false' },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'simple', description: t.value.propSimple, type: 'boolean', default: 'false' },
  {
    name: 'showSizeChanger',
    description: t.value.propShowSizeChanger,
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'pageSizeOptions',
    description: t.value.propPageSizeOptions,
    type: 'number[]',
    default: '[10, 20, 50, 100]',
  },
  {
    name: 'showQuickJumper',
    description: t.value.propShowQuickJumper,
    type: 'boolean',
    default: 'false',
  },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@change', description: t.value.emitChange, type: '(page: number) => void' },
  {
    name: '@page-size-change',
    description: t.value.emitPageSizeChange,
    type: '(size: number) => void',
  },
])

const paginationCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-color-bg', default: '#ffffff', description: t.value.cssBg },
  { name: 'sg-color-border', default: 'var(--sg-gray-4)', description: t.value.cssBorder },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: t.value.cssTextSecondary,
  },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: t.value.cssTextDisabled,
  },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.value.cssPrimary },
  {
    name: 'sg-color-primary-hover',
    default: 'var(--sg-blue-5)',
    description: t.value.cssPrimaryHover,
  },
  { name: 'sg-color-white', default: '#ffffff', description: t.value.cssWhite },
  { name: 'sg-height-md', default: '32px', description: t.value.cssHeightMd },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-margin-xs', default: '4px', description: t.value.cssMarginXs },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssFontSizeSm },
  { name: 'sg-border-radius', default: '6px', description: t.value.cssBorderRadius },
  { name: 'sg-font-size', default: '14px', description: t.value.cssFontSize },
  {
    name: 'sg-transition-duration',
    default: '0.2s',
    description: t.value.cssTransitionDuration,
  },
  {
    name: 'sg-transition-timing',
    default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    description: t.value.cssTransitionTiming,
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbPagination]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource" vertical>
      <BasicPagination />
    </DemoBox>

    <DemoBox
      :title="t.demoManyPagesTitle"
      :description="t.demoManyPagesDesc"
      :code="ManyPagesSource"
      vertical
    >
      <ManyPagesPagination />
    </DemoBox>

    <DemoBox
      :title="t.demoSimpleTitle"
      :description="t.demoSimpleDesc"
      :code="SimpleSource"
      vertical
    >
      <SimplePagination />
    </DemoBox>

    <DemoBox
      :title="t.demoShowTotalTitle"
      :description="t.demoShowTotalDesc"
      :code="ShowTotalSource"
      vertical
    >
      <ShowTotalPagination />
    </DemoBox>

    <DemoBox
      :title="t.demoSizeChangerTitle"
      :description="t.demoSizeChangerDesc"
      :code="SizeChangerSource"
      vertical
    >
      <SizeChangerPagination />
    </DemoBox>

    <DemoBox
      :title="t.demoDisabledTitle"
      :description="t.demoDisabledDesc"
      :code="DisabledSource"
      vertical
    >
      <DisabledPagination />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
      vertical
    >
      <TokensOverridePagination />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
      vertical
    >
      <UnstyledPagination />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tablePaginationApi" :data="paginationProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="paginationCssVars" />
    </template>
  </ComponentDoc>
</template>
