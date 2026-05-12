<script setup lang="ts">
/**
 * `FormDemo` — aggregator for the Form component page.
 *
 * Mirrors `examples/demo/src/demos/FormDemo.tsx` in spirit. 19 of 22
 * React demos ported. Still deferred: FormListDynamic (needs richer
 * `SgFormList` slots), ProfileSettings (depends on grid layout helpers
 * already in the demo CSS), ProgrammaticControl (needs an external
 * `useForm` instance that exposes the same surface as React's hook —
 * already wired but the demo itself isn't ported yet). See
 * `docs/_streams/findings/T-Vue-Demo-Complex.md → form-deferred-examples`.
 */
import { computed } from 'vue'
import { ComponentDoc, DemoBox, PropsTable, type PropDef } from './components'

import { useFormDocStrings } from './form-doc/useStrings'

import BasicForm from './form/Basic.demo.vue'
import BasicSource from './form/Basic.demo.vue?raw'
import ValidationForm from './form/ValidationRules.demo.vue'
import ValidationSource from './form/ValidationRules.demo.vue?raw'
import LayoutVForm from './form/LayoutVertical.demo.vue'
import LayoutVSource from './form/LayoutVertical.demo.vue?raw'
import LayoutHForm from './form/LayoutHorizontal.demo.vue'
import LayoutHSource from './form/LayoutHorizontal.demo.vue?raw'
import LayoutIForm from './form/LayoutInline.demo.vue'
import LayoutISource from './form/LayoutInline.demo.vue?raw'
import RequiredMarkForm from './form/RequiredMark.demo.vue'
import RequiredMarkSource from './form/RequiredMark.demo.vue?raw'
import SizesForm from './form/FormSizes.demo.vue'
import SizesSource from './form/FormSizes.demo.vue?raw'
import DisabledForm from './form/Disabled.demo.vue'
import DisabledSource from './form/Disabled.demo.vue?raw'
import NestedForm from './form/NestedFields.demo.vue'
import NestedSource from './form/NestedFields.demo.vue?raw'
import ControlsForm from './form/Controls.demo.vue'
import ControlsSource from './form/Controls.demo.vue?raw'
import CompositionForm from './form/DistributedComposition.demo.vue'
import CompositionSource from './form/DistributedComposition.demo.vue?raw'
import AsyncForm from './form/AsyncValidation.demo.vue'
import AsyncSource from './form/AsyncValidation.demo.vue?raw'
import DependentForm from './form/DependentFields.demo.vue'
import DependentSource from './form/DependentFields.demo.vue?raw'
import FieldStatusForm from './form/FieldStatus.demo.vue'
import FieldStatusSource from './form/FieldStatus.demo.vue?raw'
import LiveWatchForm from './form/LiveWatch.demo.vue'
import LiveWatchSource from './form/LiveWatch.demo.vue?raw'
import LoginCardForm from './form/LoginCard.demo.vue'
import LoginCardSource from './form/LoginCard.demo.vue?raw'
import SearchBarForm from './form/SearchBar.demo.vue'
import SearchBarSource from './form/SearchBar.demo.vue?raw'
import SchemaBasicForm from './form/SchemaFormBasic.demo.vue'
import SchemaBasicSource from './form/SchemaFormBasic.demo.vue?raw'
import SchemaLayoutForm from './form/SchemaFormLayout.demo.vue'
import SchemaLayoutSource from './form/SchemaFormLayout.demo.vue?raw'

const t = useFormDocStrings()

const formProps = computed<PropDef[]>(() => [
  {
    name: 'layout',
    description: t.value.propLayout,
    type: "'horizontal' | 'vertical' | 'inline'",
    default: "'vertical'",
  },
  {
    name: 'size',
    description: t.value.propSize,
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: t.value.propDisabled, type: 'boolean', default: 'false' },
  {
    name: 'requiredMark',
    description: t.value.propRequiredMark,
    type: "boolean | 'optional'",
    default: 'true',
  },
  {
    name: 'labelCol',
    description: t.value.propLabelCol,
    type: '{ span?: number; offset?: number }',
  },
  {
    name: 'wrapperCol',
    description: t.value.propWrapperCol,
    type: '{ span?: number; offset?: number }',
  },
  {
    name: 'labelAlign',
    description: t.value.propLabelAlign,
    type: "'left' | 'right'",
    default: "'right'",
  },
  {
    name: 'validateOn',
    description: t.value.propValidateOn,
    type: "'change' | 'blur' | 'submit'",
    default: "'change'",
  },
  {
    name: 'scrollToFirstError',
    description: t.value.propScroll,
    type: 'boolean',
    default: 'false',
  },
  { name: 'preserve', description: t.value.propPreserve, type: 'boolean', default: 'true' },
  {
    name: 'defaultValues',
    description: t.value.propDefaultValues,
    type: 'Record<string, unknown>',
  },
  { name: 'colon', description: t.value.propColon, type: 'boolean', default: 'false' },
  { name: '@finish', description: t.value.emitFinish, type: '(values) => void' },
  { name: '@finishFailed', description: t.value.emitFinishFailed, type: '(errors) => void' },
  { name: '@valuesChange', description: t.value.emitValuesChange, type: '(values) => void' },
])

const fieldProps = computed<PropDef[]>(() => [
  { name: 'name', description: t.value.propFieldName, type: 'string', required: true },
  { name: 'label', description: t.value.propFieldLabel, type: 'string' },
  { name: 'required', description: t.value.propFieldRequired, type: 'boolean', default: 'false' },
  { name: 'rules', description: t.value.propFieldRules, type: 'Rule[]', default: '[]' },
  { name: 'help', description: t.value.propFieldHelp, type: 'string' },
  { name: 'extra', description: t.value.propFieldExtra, type: 'string' },
  { name: 'hidden', description: t.value.propFieldHidden, type: 'boolean', default: 'false' },
  { name: 'noStyle', description: t.value.propFieldNoStyle, type: 'boolean', default: 'false' },
  { name: 'normalize', description: t.value.propFieldNormalize, type: '(v, prev) => unknown' },
  {
    name: 'validateFirst',
    description: t.value.propFieldValidateFirst,
    type: 'boolean',
    default: 'false',
  },
  { name: 'tooltip', description: t.value.propFieldTooltip, type: 'string' },
  {
    name: 'labelCol',
    description: t.value.propLabelCol,
    type: '{ span?: number; offset?: number }',
  },
  {
    name: 'wrapperCol',
    description: t.value.propWrapperCol,
    type: '{ span?: number; offset?: number }',
  },
])
</script>

<template>
  <ComponentDoc
    :title="t.pageTitle"
    :badge="t.pageBadge"
    :crumbs="[t.crumbData, t.crumbForm]"
    :description="t.pageLead"
    :when-to-use="[t.pageWhen1, t.pageWhen2]"
  >
    <DemoBox :title="t.demoBasicTitle" :description="t.demoBasicDesc" :code="BasicSource">
      <BasicForm />
    </DemoBox>
    <DemoBox
      :title="t.demoValidationTitle"
      :description="t.demoValidationDesc"
      :code="ValidationSource"
    >
      <ValidationForm />
    </DemoBox>
    <DemoBox :title="t.demoLayoutVTitle" :description="t.demoLayoutVDesc" :code="LayoutVSource">
      <LayoutVForm />
    </DemoBox>
    <DemoBox :title="t.demoLayoutHTitle" :description="t.demoLayoutHDesc" :code="LayoutHSource">
      <LayoutHForm />
    </DemoBox>
    <DemoBox :title="t.demoLayoutITitle" :description="t.demoLayoutIDesc" :code="LayoutISource">
      <LayoutIForm />
    </DemoBox>
    <DemoBox
      :title="t.demoRequiredMarkTitle"
      :description="t.demoRequiredMarkDesc"
      :code="RequiredMarkSource"
    >
      <RequiredMarkForm />
    </DemoBox>
    <DemoBox :title="t.demoSizesTitle" :description="t.demoSizesDesc" :code="SizesSource">
      <SizesForm />
    </DemoBox>
    <DemoBox :title="t.demoDisabledTitle" :description="t.demoDisabledDesc" :code="DisabledSource">
      <DisabledForm />
    </DemoBox>
    <DemoBox :title="t.demoNestedTitle" :description="t.demoNestedDesc" :code="NestedSource">
      <NestedForm />
    </DemoBox>
    <DemoBox :title="t.demoControlsTitle" :description="t.demoControlsDesc" :code="ControlsSource">
      <ControlsForm />
    </DemoBox>
    <DemoBox
      :title="t.demoCompositionTitle"
      :description="t.demoCompositionDesc"
      :code="CompositionSource"
    >
      <CompositionForm />
    </DemoBox>
    <DemoBox :title="t.demoAsyncTitle" :description="t.demoAsyncDesc" :code="AsyncSource">
      <AsyncForm />
    </DemoBox>
    <DemoBox
      :title="t.demoDependentTitle"
      :description="t.demoDependentDesc"
      :code="DependentSource"
    >
      <DependentForm />
    </DemoBox>
    <DemoBox
      :title="t.demoFieldStatusTitle"
      :description="t.demoFieldStatusDesc"
      :code="FieldStatusSource"
    >
      <FieldStatusForm />
    </DemoBox>
    <DemoBox
      :title="t.demoLiveWatchTitle"
      :description="t.demoLiveWatchDesc"
      :code="LiveWatchSource"
    >
      <LiveWatchForm />
    </DemoBox>
    <DemoBox
      :title="t.demoLoginCardTitle"
      :description="t.demoLoginCardDesc"
      :code="LoginCardSource"
    >
      <LoginCardForm />
    </DemoBox>
    <DemoBox
      :title="t.demoSearchBarTitle"
      :description="t.demoSearchBarDesc"
      :code="SearchBarSource"
    >
      <SearchBarForm />
    </DemoBox>
    <DemoBox
      :title="t.demoSchemaBasicTitle"
      :description="t.demoSchemaBasicDesc"
      :code="SchemaBasicSource"
    >
      <SchemaBasicForm />
    </DemoBox>
    <DemoBox
      :title="t.demoSchemaLayoutTitle"
      :description="t.demoSchemaLayoutDesc"
      :code="SchemaLayoutSource"
    >
      <SchemaLayoutForm />
    </DemoBox>

    <template #api>
      <PropsTable :title="t.tableFormApi" :data="formProps" />
      <PropsTable :title="t.tableFieldApi" :data="fieldProps" />
    </template>
  </ComponentDoc>
</template>
