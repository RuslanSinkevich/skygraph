import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useFormDocStrings } from './form-doc/useFormDocStrings'

import { BasicForm } from './form/BasicForm.demo'
import BasicFormSource from './form/BasicForm.demo?raw'
import { ValidationRulesForm } from './form/ValidationRules.demo'
import ValidationRulesSource from './form/ValidationRules.demo?raw'
import { DependentFieldsForm } from './form/DependentFields.demo'
import DependentFieldsSource from './form/DependentFields.demo?raw'
import { AsyncValidationForm } from './form/AsyncValidation.demo'
import AsyncValidationSource from './form/AsyncValidation.demo?raw'
import { LayoutVerticalForm } from './form/LayoutVertical.demo'
import LayoutVerticalSource from './form/LayoutVertical.demo?raw'
import { LayoutHorizontalForm } from './form/LayoutHorizontal.demo'
import LayoutHorizontalSource from './form/LayoutHorizontal.demo?raw'
import { LayoutInlineForm } from './form/LayoutInline.demo'
import LayoutInlineSource from './form/LayoutInline.demo?raw'
import { RequiredMarkForm } from './form/RequiredMark.demo'
import RequiredMarkSource from './form/RequiredMark.demo?raw'
import { FormSizes } from './form/FormSizes.demo'
import FormSizesSource from './form/FormSizes.demo?raw'
import { DisabledForm } from './form/DisabledForm.demo'
import DisabledFormSource from './form/DisabledForm.demo?raw'
import { FormControlsShowcase } from './form/FormControls.demo'
import FormControlsSource from './form/FormControls.demo?raw'
import { FormListDynamic } from './form/FormListDynamic.demo'
import FormListDynamicSource from './form/FormListDynamic.demo?raw'
import { NestedFieldsForm } from './form/NestedFields.demo'
import NestedFieldsSource from './form/NestedFields.demo?raw'
import { DistributedCompositionForm } from './form/DistributedComposition.demo'
import DistributedCompositionSource from './form/DistributedComposition.demo?raw'
import { ProgrammaticControlForm } from './form/ProgrammaticControl.demo'
import ProgrammaticControlSource from './form/ProgrammaticControl.demo?raw'
import { LiveWatchForm } from './form/LiveWatch.demo'
import LiveWatchSource from './form/LiveWatch.demo?raw'
import { FieldStatusForm } from './form/FieldStatus.demo'
import FieldStatusSource from './form/FieldStatus.demo?raw'
import { LoginCardForm } from './form/LoginCard.demo'
import LoginCardSource from './form/LoginCard.demo?raw'
import { SearchBarForm } from './form/SearchBar.demo'
import SearchBarSource from './form/SearchBar.demo?raw'
import { ProfileSettingsForm } from './form/ProfileSettings.demo'
import ProfileSettingsSource from './form/ProfileSettings.demo?raw'
import { SchemaFormBasic } from './form/SchemaFormBasic.demo'
import SchemaFormBasicSource from './form/SchemaFormBasic.demo?raw'
import { SchemaFormLayout } from './form/SchemaFormLayout.demo'
import SchemaFormLayoutSource from './form/SchemaFormLayout.demo?raw'

export function FormDemo() {
  const t = useFormDocStrings()

  const formProps = useMemo<PropDef[]>(
    () => [
      { name: 'layout', description: t.formLayout, type: "'horizontal' | 'vertical' | 'inline'", default: "'vertical'" },
      { name: 'defaultValues', description: t.formDefaultValues, type: 'Record<string, any>' },
      { name: 'onSubmit', description: t.formOnSubmit, type: '(values) => void | Promise<void>' },
      { name: 'onSubmitInvalid', description: t.formOnSubmitInvalid, type: '(errors) => void' },
      { name: 'onValuesChange', description: t.formOnValuesChange, type: '(changed, all) => void' },
      { name: 'validateTrigger', description: t.formValidateTrigger, type: "'onChange' | 'onBlur' | 'onSubmit'", default: "'onChange'" },
      { name: 'scrollToFirstError', description: t.formScrollToFirstError, type: 'boolean | ScrollIntoViewOptions', default: 'false' },
      { name: 'preserve', description: t.formPreserve, type: 'boolean', default: 'true' },
      { name: 'disabled', description: t.formDisabled, type: 'boolean', default: 'false' },
      { name: 'size', description: t.formSize, type: "'small' | 'middle' | 'large'" },
      { name: 'requiredMark', description: t.formRequiredMark, type: "boolean | 'optional'", default: 'true' },
      { name: 'colon', description: t.formColon, type: 'boolean', default: 'true' },
      { name: 'labelCol', description: t.formLabelCol, type: '{ span?: number; offset?: number }' },
      { name: 'wrapperCol', description: t.formWrapperCol, type: '{ span?: number; offset?: number }' },
      { name: 'labelAlign', description: t.formLabelAlign, type: "'left' | 'right'" },
      { name: 'feedbackIcons', description: t.formFeedbackIcons, type: '{ success?, warning?, error?, validating? }' },
      { name: 'form', description: t.formFormProp, type: 'UseFormReturn' },
    ],
    [t],
  )

  const fieldProps = useMemo<PropDef[]>(
    () => [
      { name: 'name', description: t.fieldName, type: 'string' },
      { name: 'label', description: t.fieldLabel, type: 'string' },
      { name: 'required', description: t.fieldRequired, type: 'boolean' },
      { name: 'rules', description: t.fieldRules, type: 'Rule[]' },
      { name: 'warningRules', description: t.fieldWarningRules, type: 'Rule[]' },
      { name: 'dependencies', description: t.fieldDependencies, type: 'string[]' },
      { name: 'type', description: t.fieldType, type: "'text' | 'email' | 'password' | 'number' | 'textarea'" },
      { name: 'placeholder', description: t.fieldPlaceholder, type: 'string' },
      { name: 'disabled', description: t.fieldDisabled, type: 'boolean' },
      { name: 'hidden', description: t.fieldHidden, type: 'boolean' },
      { name: 'tooltip', description: t.fieldTooltip, type: 'string' },
      { name: 'help', description: t.fieldHelp, type: 'ReactNode' },
      { name: 'extra', description: t.fieldExtra, type: 'ReactNode' },
      { name: 'validateStatus', description: t.fieldValidateStatus, type: "'success' | 'warning' | 'error' | 'validating'" },
      { name: 'hasFeedback', description: t.fieldHasFeedback, type: 'boolean' },
      { name: 'normalize', description: t.fieldNormalize, type: '(value, prevValue) => unknown' },
      { name: 'valuePropName', description: t.fieldValuePropName, type: 'string', default: "'value'" },
      { name: 'validateFirst', description: t.fieldValidateFirst, type: 'boolean', default: 'false' },
      { name: 'preserve', description: t.fieldPreserve, type: 'boolean' },
      { name: 'labelCol', description: t.fieldLabelCol, type: '{ span?: number; offset?: number }' },
      { name: 'wrapperCol', description: t.fieldWrapperCol, type: '{ span?: number; offset?: number }' },
      { name: 'children', description: t.fieldChildren, type: '(field: UseFieldReturn) => ReactNode' },
    ],
    [t],
  )

  const formListProps = useMemo<PropDef[]>(
    () => [
      { name: 'name', description: t.formListName, type: 'string' },
      { name: 'initialValue', description: t.formListInitialValue, type: 'unknown[]' },
      { name: 'draggable', description: t.formListDraggable, type: 'boolean', default: 'false' },
      { name: 'children', description: t.formListChildren, type: 'Function' },
    ],
    [t],
  )

  const schemaFormProps = useMemo<PropDef[]>(
    () => [
      { name: 'schema', description: t.schemaFormSchema, type: 'JSONSchema | ZodSchema' },
      { name: 'onSubmit', description: t.schemaFormOnSubmit, type: '(values) => void | Promise<void>' },
      { name: 'layout', description: t.schemaFormLayout, type: "'horizontal' | 'vertical' | 'inline'" },
      { name: 'size', description: t.schemaFormSize, type: "'small' | 'middle' | 'large'" },
      { name: 'disabled', description: t.schemaFormDisabled, type: 'boolean', default: 'false' },
      { name: 'labelCol', description: t.schemaFormLabelCol, type: '{ span?: number; offset?: number }' },
      { name: 'wrapperCol', description: t.schemaFormWrapperCol, type: '{ span?: number; offset?: number }' },
      { name: 'form', description: t.schemaFormForm, type: 'UseFormReturn' },
      { name: 'submitText', description: t.schemaFormSubmitText, type: 'string', default: "'Submit'" },
      { name: 'children', description: t.schemaFormChildren, type: 'ReactNode' },
    ],
    [t],
  )

  const formCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.cssSgColorError },
      { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: t.cssSgColorErrorBg },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-margin-xs', default: '4px', description: t.cssSgMarginXs },
      { name: 'sg-margin-md', default: '16px', description: t.cssSgMarginMd },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-line-height', default: '1.5714', description: t.cssSgLineHeight },
      { name: 'sg-input-border', default: 'var(--sg-color-border)', description: t.cssSgInputBorder },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3, t.pageWhen4]}
    >
      {/* ── Basics ──────────────────────────────────────────────────── */}
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicFormSource}>
        <BasicForm />
      </DemoBox>

      <DemoBox title={t.demoValidationRulesTitle} description={t.demoValidationRulesDesc} code={ValidationRulesSource}>
        <ValidationRulesForm />
      </DemoBox>

      <DemoBox title={t.demoDependentFieldsTitle} description={t.demoDependentFieldsDesc} code={DependentFieldsSource}>
        <DependentFieldsForm />
      </DemoBox>

      <DemoBox title={t.demoAsyncValidationTitle} description={t.demoAsyncValidationDesc} code={AsyncValidationSource}>
        <AsyncValidationForm />
      </DemoBox>

      {/* ── Layout ─────────────────────────────────────────────────── */}
      <DemoBox title={t.demoLayoutVerticalTitle} description={t.demoLayoutVerticalDesc} code={LayoutVerticalSource}>
        <LayoutVerticalForm />
      </DemoBox>

      <DemoBox title={t.demoLayoutHorizontalTitle} description={t.demoLayoutHorizontalDesc} code={LayoutHorizontalSource}>
        <LayoutHorizontalForm />
      </DemoBox>

      <DemoBox title={t.demoLayoutInlineTitle} description={t.demoLayoutInlineDesc} code={LayoutInlineSource}>
        <LayoutInlineForm />
      </DemoBox>

      <DemoBox title={t.demoRequiredMarkTitle} description={t.demoRequiredMarkDesc} code={RequiredMarkSource}>
        <RequiredMarkForm />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={FormSizesSource}>
        <FormSizes />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledFormSource}>
        <DisabledForm />
      </DemoBox>

      {/* ── Controls ───────────────────────────────────────────────── */}
      <DemoBox title={t.demoControlsTitle} description={t.demoControlsDesc} code={FormControlsSource}>
        <FormControlsShowcase />
      </DemoBox>

      <DemoBox title={t.demoFieldStatusTitle} description={t.demoFieldStatusDesc} code={FieldStatusSource}>
        <FieldStatusForm />
      </DemoBox>

      {/* ── Dynamic / Nested ───────────────────────────────────────── */}
      <DemoBox title={t.demoFormListTitle} description={t.demoFormListDesc} code={FormListDynamicSource}>
        <FormListDynamic />
      </DemoBox>

      <DemoBox title={t.demoNestedFieldsTitle} description={t.demoNestedFieldsDesc} code={NestedFieldsSource}>
        <NestedFieldsForm />
      </DemoBox>

      <DemoBox title={t.demoDistributedTitle} description={t.demoDistributedDesc} code={DistributedCompositionSource}>
        <DistributedCompositionForm />
      </DemoBox>

      {/* ── Imperative / Observed ──────────────────────────────────── */}
      <DemoBox title={t.demoProgrammaticTitle} description={t.demoProgrammaticDesc} code={ProgrammaticControlSource}>
        <ProgrammaticControlForm />
      </DemoBox>

      <DemoBox title={t.demoLiveWatchTitle} description={t.demoLiveWatchDesc} code={LiveWatchSource}>
        <LiveWatchForm />
      </DemoBox>

      {/* ── Styling patterns ───────────────────────────────────────── */}
      <DemoBox title={t.demoLoginCardTitle} description={t.demoLoginCardDesc} code={LoginCardSource}>
        <LoginCardForm />
      </DemoBox>

      <DemoBox title={t.demoSearchBarTitle} description={t.demoSearchBarDesc} code={SearchBarSource}>
        <SearchBarForm />
      </DemoBox>

      <DemoBox title={t.demoProfileSettingsTitle} description={t.demoProfileSettingsDesc} code={ProfileSettingsSource}>
        <ProfileSettingsForm />
      </DemoBox>

      {/* ── Schema-driven ──────────────────────────────────────────── */}
      <DemoBox title={t.demoSchemaFormBasicTitle} description={t.demoSchemaFormBasicDesc} code={SchemaFormBasicSource}>
        <SchemaFormBasic />
      </DemoBox>

      <DemoBox title={t.demoSchemaFormLayoutTitle} description={t.demoSchemaFormLayoutDesc} code={SchemaFormLayoutSource}>
        <SchemaFormLayout />
      </DemoBox>

      <PropsTable title={t.tableFormApi} data={formProps} />
      <PropsTable title={t.tableFieldApi} data={fieldProps} />
      <PropsTable title={t.tableFormListApi} data={formListProps} />
      <PropsTable title={t.tableSchemaFormApi} data={schemaFormProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={formCssVars}
      />
    </ComponentDoc>
  )
}
