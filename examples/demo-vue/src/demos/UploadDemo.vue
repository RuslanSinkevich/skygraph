<script setup lang="ts">
/**
 * `UploadDemo` — aggregator for the Upload component page.
 *
 * Mirrors `examples/demo/src/demos/UploadDemo.tsx` (9 examples).
 * Vue surface (9 examples): Basic, Multiple, Accept, CustomTrigger,
 * WithProgress, ErrorState, Disabled, TokensOverride, Unstyled.
 *
 * Vue parity gaps:
 * - React's `Disabled` demo also showed `loading` — Vue dropped that
 *   row (no `loading` prop in `SgUpload`).
 * - Vue Upload exposes `customRequest` instead of React's
 *   `onUpload(File[])` — the basic demo uses it for the simulated
 *   `uploading → done` transition.
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
import { useUploadDocStrings } from './upload-doc/useStrings'

import BasicUploadDemo from './upload/Basic.demo.vue'
import BasicSource from './upload/Basic.demo.vue?raw'
import MultipleUploadDemo from './upload/Multiple.demo.vue'
import MultipleSource from './upload/Multiple.demo.vue?raw'
import AcceptUploadDemo from './upload/Accept.demo.vue'
import AcceptSource from './upload/Accept.demo.vue?raw'
import CustomTriggerUploadDemo from './upload/CustomTrigger.demo.vue'
import CustomTriggerSource from './upload/CustomTrigger.demo.vue?raw'
import WithProgressUploadDemo from './upload/WithProgress.demo.vue'
import WithProgressSource from './upload/WithProgress.demo.vue?raw'
import ErrorStateUploadDemo from './upload/ErrorState.demo.vue'
import ErrorStateSource from './upload/ErrorState.demo.vue?raw'
import DisabledUploadDemo from './upload/Disabled.demo.vue'
import DisabledSource from './upload/Disabled.demo.vue?raw'
import TokensOverrideUploadDemo from './upload/TokensOverride.demo.vue'
import TokensOverrideSource from './upload/TokensOverride.demo.vue?raw'
import UnstyledUploadDemo from './upload/Unstyled.demo.vue'
import UnstyledSource from './upload/Unstyled.demo.vue?raw'

const t = useUploadDocStrings()

const uploadProps = computed<PropDef[]>(() => [
  { name: 'modelValue', description: t.value.propModelValue, type: 'UploadFile[]' },
  { name: 'fileList', description: t.value.propFileList, type: 'UploadFile[]' },
  {
    name: 'defaultFileList',
    description: t.value.propDefaultFileList,
    type: 'UploadFile[]',
  },
  { name: 'accept', description: t.value.propAccept, type: 'string' },
  { name: 'multiple', description: t.value.propMultiple, type: 'boolean', default: 'false' },
  { name: 'drag', description: t.value.propDrag, type: 'boolean', default: 'false' },
  {
    name: 'listType',
    description: t.value.propListType,
    type: "'text' | 'picture' | 'picture-card'",
    default: "'text'",
  },
  {
    name: 'showUploadList',
    description: t.value.propShowUploadList,
    type: 'boolean',
    default: 'true',
  },
  { name: 'maxCount', description: t.value.propMaxCount, type: 'number' },
  { name: 'maxSize', description: t.value.propMaxSize, type: 'number' },
  {
    name: 'beforeUpload',
    description: t.value.propBeforeUpload,
    type: '(file: File, list: File[]) => boolean | Promise<boolean | File>',
  },
  {
    name: 'customRequest',
    description: t.value.propCustomRequest,
    type: '(opts: { file, onProgress, onSuccess, onError }) => void',
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  { name: 'unstyled', description: t.value.propUnstyled, type: 'boolean', default: 'false' },
  {
    name: '@update:modelValue',
    description: t.value.emitUpdateModelValue,
    type: '(files: UploadFile[]) => void',
  },
  {
    name: '@change',
    description: t.value.emitChange,
    type: '(files: UploadFile[]) => void',
  },
  { name: '@remove', description: t.value.emitRemove, type: '(file: UploadFile) => void' },
])

const fileProps = computed<PropDef[]>(() => [
  { name: 'uid', description: t.value.fileUid, type: 'string' },
  { name: 'name', description: t.value.fileName, type: 'string' },
  { name: 'size', description: t.value.fileSize, type: 'number' },
  {
    name: 'status',
    description: t.value.fileStatus,
    type: "'uploading' | 'done' | 'error' | 'removed'",
  },
  { name: 'percent', description: t.value.filePercent, type: 'number' },
  { name: 'type', description: t.value.fileType, type: 'string' },
  { name: 'url', description: t.value.fileUrl, type: 'string' },
  { name: 'error', description: t.value.fileError, type: 'unknown' },
  { name: 'raw', description: t.value.fileRaw, type: 'File' },
])

const uploadCssVars = computed<CssVarDef[]>(() => [
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: t.value.cssSgColorBorderSecondary,
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.value.cssSgColorText },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: t.value.cssSgColorTextTertiary,
  },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.value.cssSgColorError },
  { name: 'sg-border-radius-sm', default: '4px', description: t.value.cssSgBorderRadiusSm },
  { name: 'sg-font-size', default: '14px', description: t.value.cssSgFontSize },
  { name: 'sg-font-size-sm', default: '12px', description: t.value.cssSgFontSizeSm },
  { name: 'sg-margin-sm', default: '12px', description: t.value.cssSgMarginSm },
  { name: 'sg-margin-xs', default: '8px', description: t.value.cssSgMarginXs },
  { name: 'sg-padding-xs', default: '8px', description: t.value.cssSgPaddingXs },
  { name: 'sg-padding-sm', default: '12px', description: t.value.cssSgPaddingSm },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbCategory, t.crumbUpload]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicUploadDemo />
    </DemoBox>

    <DemoBox :title="t.demoMultipleTitle" :description="t.demoMultipleDesc" :code="MultipleSource">
      <MultipleUploadDemo />
    </DemoBox>

    <DemoBox :title="t.demoAcceptTitle" :description="t.demoAcceptDesc" :code="AcceptSource">
      <AcceptUploadDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoCustomTriggerTitle"
      :description="t.demoCustomTriggerDesc"
      :code="CustomTriggerSource"
    >
      <CustomTriggerUploadDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoWithProgressTitle"
      :description="t.demoWithProgressDesc"
      :code="WithProgressSource"
    >
      <WithProgressUploadDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoErrorStateTitle"
      :description="t.demoErrorStateDesc"
      :code="ErrorStateSource"
    >
      <ErrorStateUploadDemo />
    </DemoBox>

    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledUploadDemo />
    </DemoBox>

    <DemoBox
      :title="t.demoTokensOverrideTitle"
      :description="t.demoTokensOverrideDesc"
      :code="TokensOverrideSource"
    >
      <TokensOverrideUploadDemo />
    </DemoBox>

    <DemoBox :title="t.demoUnstyledTitle" :description="t.demoUnstyledDesc" :code="UnstyledSource">
      <UnstyledUploadDemo />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableUploadApi" :data="uploadProps" />
      <PropsTable :title="t.tableUploadFile" :data="fileProps" />
      <CssVarsTable :title="t.tableCssVars" :hint="t.cssHint" :data="uploadCssVars" />
    </template>
  </ComponentDoc>
</template>
