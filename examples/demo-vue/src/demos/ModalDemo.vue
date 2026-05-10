<script setup lang="ts">
/**
 * `ModalDemo` — aggregator for the Modal component page.
 *
 * Mirrors `examples/demo/src/demos/ModalDemo.tsx` with these
 * Vue-specific deltas (already documented in the doc strings):
 *   - `<SgModal>` renders through `<Teleport to="body">` — same
 *     `sg-modal-mask` / `sg-modal` DOM as React but mounted onto
 *     `<body>` (React's Modal renders inline).
 *   - Closing emits `@close`; the default OK / Cancel footer is
 *     enabled by `okHandler` (not React's `onOk`).
 *   - `footer` is `'default' | 'none'` (custom markup → `#footer`
 *     slot). React uses `ReactNode | null`.
 *   - There is no `className` prop — token / class scoping in the
 *     `TokensOverride` and `Unstyled` demos uses a body-level class
 *     toggled while the modal is open.
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

import { useModalDocStrings } from './modal-doc/useStrings'

import BasicModal from './modal/Basic.demo.vue'
import BasicSource from './modal/Basic.demo.vue?raw'
import DefaultFooterModal from './modal/DefaultFooter.demo.vue'
import DefaultFooterSource from './modal/DefaultFooter.demo.vue?raw'
import AsyncConfirmModal from './modal/AsyncConfirm.demo.vue'
import AsyncConfirmSource from './modal/AsyncConfirm.demo.vue?raw'
import WidthsModal from './modal/Widths.demo.vue'
import WidthsSource from './modal/Widths.demo.vue?raw'
import NoFooterModal from './modal/NoFooter.demo.vue'
import NoFooterSource from './modal/NoFooter.demo.vue?raw'
import TokensOverrideModal from './modal/TokensOverride.demo.vue'
import TokensOverrideSource from './modal/TokensOverride.demo.vue?raw'
import UnstyledModal from './modal/Unstyled.demo.vue'
import UnstyledSource from './modal/Unstyled.demo.vue?raw'

const t = useModalDocStrings()

const modalProps = computed<PropDef[]>(() => [
  { name: 'open', description: t.value.propOpen, type: 'boolean', default: 'false' },
  { name: 'title', description: t.value.propTitle, type: 'string' },
  { name: 'footer', description: t.value.propFooter, type: "'default' | 'none'" },
  {
    name: 'width',
    description: t.value.propWidth,
    type: 'number | string',
    default: '520',
  },
  {
    name: 'okHandler',
    description: t.value.propOkHandler,
    type: '() => void | Promise<void>',
  },
  { name: 'okText', description: t.value.propOkText, type: 'string' },
  { name: 'cancelText', description: t.value.propCancelText, type: 'string' },
  {
    name: 'okType',
    description: t.value.propOkType,
    type: "'primary' | 'default' | 'dashed' | 'text'",
    default: "'primary'",
  },
  { name: 'confirmLoading', description: t.value.propConfirmLoading, type: 'boolean' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  { name: '@close', description: t.value.emitClose, type: '() => void' },
  { name: '@ok', description: t.value.emitOk, type: '() => void' },
  { name: '#default', description: t.value.slotDefault, type: 'slot' },
  { name: '#footer', description: t.value.slotFooter, type: 'slot' },
])

const modalCssVars = computed<CssVarDef[]>(() => [
  { name: 'sg-z-modal', default: '1000', description: t.value.cssZModal },
  { name: 'sg-color-overlay', default: 'rgba(0, 0, 0, 0.45)', description: t.value.cssOverlay },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: t.value.cssBgElevated },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssText },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssTextTertiary,
  },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.value.cssBgHover },
  { name: 'sg-border-radius-lg', default: '8px', description: t.value.cssRadiusLg },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssRadiusSm },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0, 0, 0, 0.12)',
    description: t.value.cssShadowLg,
  },
  { name: 'sg-padding-lg', default: '16px', description: t.value.cssPaddingLg },
  { name: 'sg-padding-md', default: '12px', description: t.value.cssPaddingMd },
  { name: 'sg-padding-sm', default: '8px', description: t.value.cssPaddingSm },
  { name: 'sg-padding-xl', default: '24px', description: t.value.cssPaddingXl },
  { name: 'sg-font-size-lg', default: '16px', description: t.value.cssFontSizeLg },
  { name: 'sg-font-size-xl', default: '20px', description: t.value.cssFontSizeXl },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbModal]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicModal />
    </DemoBox>

    <DemoBox
      :title="t.demoDefaultFooterTitle"
      :description="t.demoDefaultFooterDesc"
      :code="DefaultFooterSource"
    >
      <DefaultFooterModal />
    </DemoBox>

    <DemoBox
      :title="t.demoAsyncTitle"
      :description="t.demoAsyncDesc"
      :code="AsyncConfirmSource"
    >
      <AsyncConfirmModal />
    </DemoBox>

    <DemoBox :title="t.demoWidthsTitle" :description="t.demoWidthsDesc" :code="WidthsSource">
      <WidthsModal />
    </DemoBox>

    <DemoBox
      :title="t.demoNoFooterTitle"
      :description="t.demoNoFooterDesc"
      :code="NoFooterSource"
    >
      <NoFooterModal />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensTitle"
      :description="t.demoTokensDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideModal />
    </DemoBox>

    <DemoBox
      :title="t.demoUnstyledTitle"
      :description="t.demoUnstyledDesc"
      :code="UnstyledSource"
    >
      <UnstyledModal />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableModalApi" :data="modalProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="modalCssVars" />
    </template>
  </ComponentDoc>
</template>
