import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const formProps: PropDef[] = [
  { name: 'layout', description: 'Form layout', type: "'horizontal' | 'vertical' | 'inline'", default: "'vertical'" },
  { name: 'defaultValues', description: 'Initial form values', type: 'Record<string, any>' },
  { name: 'onSubmit', description: 'Submit handler', type: '(values) => void | Promise<void>' },
  { name: 'onSubmitInvalid', description: 'Called if validation fails on submit', type: '(errors) => void' },
  { name: 'onValuesChange', description: 'Callback when any value changes', type: '(changed, all) => void' },
  { name: 'validateTrigger', description: 'When to validate', type: "'onChange' | 'onBlur' | 'onSubmit'", default: "'onChange'" },
  { name: 'scrollToFirstError', description: 'Scroll to first error on submit', type: 'boolean | ScrollIntoViewOptions', default: 'false' },
  { name: 'preserve', description: 'Preserve values of unmounted fields', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable all form controls', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Form controls size', type: "'small' | 'middle' | 'large'" },
  { name: 'requiredMark', description: 'How required fields are marked', type: "boolean | 'optional'", default: 'true' },
  { name: 'colon', description: 'Append colon after labels', type: 'boolean', default: 'true' },
  { name: 'labelCol', description: 'Label grid (horizontal layout)', type: '{ span?: number; offset?: number }' },
  { name: 'wrapperCol', description: 'Control grid (horizontal layout)', type: '{ span?: number; offset?: number }' },
  { name: 'labelAlign', description: 'Label alignment (horizontal layout)', type: "'left' | 'right'" },
  { name: 'feedbackIcons', description: 'Custom icons per validation state', type: '{ success?, warning?, error?, validating? }' },
  { name: 'form', description: 'External useForm instance (for imperative control)', type: 'UseFormReturn' },
]

const fieldProps: PropDef[] = [
  { name: 'name', description: 'Field name (path in form values)', type: 'string' },
  { name: 'label', description: 'Field label', type: 'string' },
  { name: 'required', description: 'Shorthand for `{ required: true }` rule', type: 'boolean' },
  { name: 'rules', description: 'Validation rules array', type: 'Rule[]' },
  { name: 'warningRules', description: 'Rules that produce warnings (non-blocking)', type: 'Rule[]' },
  { name: 'dependencies', description: 'Fields to watch for re-validation', type: 'string[]' },
  { name: 'type', description: 'Built-in input type when no children are passed', type: "'text' | 'email' | 'password' | 'number' | 'textarea'" },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  { name: 'disabled', description: 'Disables this field (overrides form-level)', type: 'boolean' },
  { name: 'hidden', description: 'Hides the field but keeps its value registered', type: 'boolean' },
  { name: 'tooltip', description: 'Help tooltip next to label', type: 'string' },
  { name: 'help', description: 'Help text below the control', type: 'ReactNode' },
  { name: 'extra', description: 'Extra supplementary content below', type: 'ReactNode' },
  { name: 'validateStatus', description: 'Manual validation state badge', type: "'success' | 'warning' | 'error' | 'validating'" },
  { name: 'hasFeedback', description: 'Show status icon inside the control', type: 'boolean' },
  { name: 'normalize', description: 'Maps raw change values before committing', type: '(value, prevValue) => unknown' },
  { name: 'valuePropName', description: 'Prop name holding the value on child control', type: 'string', default: "'value'" },
  { name: 'validateFirst', description: 'Stop after the first failing rule', type: 'boolean', default: 'false' },
  { name: 'preserve', description: 'Keep value on unregister (overrides form)', type: 'boolean' },
  { name: 'labelCol', description: 'Overrides form labelCol for this field', type: '{ span?: number; offset?: number }' },
  { name: 'wrapperCol', description: 'Overrides form wrapperCol for this field', type: '{ span?: number; offset?: number }' },
  { name: 'children', description: 'Render prop for custom controls', type: '(field: UseFieldReturn) => ReactNode' },
]

const formListProps: PropDef[] = [
  { name: 'name', description: 'Array field name in form values', type: 'string' },
  { name: 'initialValue', description: 'Seed value if path is empty on mount', type: 'unknown[]' },
  { name: 'draggable', description: 'Provide dragProps on each row for HTML5 DnD', type: 'boolean', default: 'false' },
  { name: 'children', description: '(fields, { add, remove, move, replace }, meta) => ReactNode', type: 'Function' },
]

const schemaFormProps: PropDef[] = [
  { name: 'schema', description: 'JSON Schema object or a Zod schema (`_def` present) — converted to JSON Schema internally', type: 'JSONSchema | ZodSchema' },
  { name: 'onSubmit', description: 'Receives all values after a successful submit', type: '(values) => void | Promise<void>' },
  { name: 'layout', description: 'Passed through to the inner Form', type: "'horizontal' | 'vertical' | 'inline'" },
  { name: 'size', description: 'Controls size for all generated fields', type: "'small' | 'middle' | 'large'" },
  { name: 'disabled', description: 'Disables every generated control + inner Form', type: 'boolean', default: 'false' },
  { name: 'labelCol', description: '24-column span for labels (horizontal layout)', type: '{ span?: number; offset?: number }' },
  { name: 'wrapperCol', description: '24-column span for controls (horizontal layout)', type: '{ span?: number; offset?: number }' },
  { name: 'form', description: 'External `useForm()` instance (skip the internal one created from schema defaults)', type: 'UseFormReturn' },
  { name: 'submitText', description: 'Label of the default submit button when `children` is omitted', type: 'string', default: "'Submit'" },
  { name: 'children', description: 'Custom submit button / footer (replaces the default `<button type="submit">`)', type: 'ReactNode' },
]

const formCssVars: CssVarDef[] = [
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Error text + border on invalid fields' },
  { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: 'Focus ring tint on invalid fields' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Label + input text color' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Help / extra hint text' },
  { name: 'sg-font-size', default: '14px', description: 'Field text size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Help / error message size' },
  { name: 'sg-margin-xs', default: '4px', description: 'Gap between label and control' },
  { name: 'sg-margin-md', default: '16px', description: 'Bottom spacing between fields' },
  { name: 'sg-padding-md', default: '12px', description: 'Horizontal gap in horizontal layout' },
  { name: 'sg-padding-sm', default: '8px', description: 'Inline-layout gap between controls' },
  { name: 'sg-line-height', default: '1.5714', description: 'Label / help line height' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Overridden to --sg-color-error on invalid field (via Input tokens)' },
]

export function FormDemo() {
  return (
    <ComponentDoc
      title="Form"
      description="High-performance form with field-level validation, dependencies, dynamic arrays, and imperative control."
      whenToUse={[
        'When you need to create or edit data with validation.',
        'When the form has dependent fields (e.g. confirm password).',
        'For dynamic arrays — phones, tags, addresses.',
        'For search/filter bars using `layout="inline"`.',
      ]}
    >
      {/* ── Basics ──────────────────────────────────────────────────── */}
      <DemoBox
        title="Basic"
        description="Minimal form: two fields with rules and a submit button."
        code={BasicFormSource}
      >
        <BasicForm />
      </DemoBox>

      <DemoBox
        title="Validation rules"
        description="Required, length, regex, builtin types (`email`, `url`), and custom validators — each with its own message."
        code={ValidationRulesSource}
      >
        <ValidationRulesForm />
      </DemoBox>

      <DemoBox
        title="Dependent fields"
        description="`dependencies` triggers re-validation when the linked field changes. Classic password / confirm pattern."
        code={DependentFieldsSource}
      >
        <DependentFieldsForm />
      </DemoBox>

      <DemoBox
        title="Async validation"
        description="Validators may return a Promise. The field shows a spinner while the check runs."
        code={AsyncValidationSource}
      >
        <AsyncValidationForm />
      </DemoBox>

      {/* ── Layout ─────────────────────────────────────────────────── */}
      <DemoBox
        title="Layout — vertical"
        description="Labels above controls. Default and recommended for signup / profile forms."
        code={LayoutVerticalSource}
      >
        <LayoutVerticalForm />
      </DemoBox>

      <DemoBox
        title="Layout — horizontal"
        description="24-column grid via `labelCol` / `wrapperCol`. Great for admin settings."
        code={LayoutHorizontalSource}
      >
        <LayoutHorizontalForm />
      </DemoBox>

      <DemoBox
        title="Layout — inline"
        description="Everything in a single row — perfect for search / filter bars."
        code={LayoutInlineSource}
      >
        <LayoutInlineForm />
      </DemoBox>

      <DemoBox
        title="Required mark"
        description="Choose how required fields are highlighted: asterisk, nothing, or the inverted 'optional' convention."
        code={RequiredMarkSource}
      >
        <RequiredMarkForm />
      </DemoBox>

      <DemoBox
        title="Sizes"
        description="`size` on the form propagates to every control inside."
        code={FormSizesSource}
      >
        <FormSizes />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Form-level disable turns off every control in one go; individual fields can opt in or out."
        code={DisabledFormSource}
      >
        <DisabledForm />
      </DemoBox>

      {/* ── Controls ───────────────────────────────────────────────── */}
      <DemoBox
        title="Controls gallery"
        description="One form wired to every supported control — Select, Checkbox, RadioGroup, Switch, InputNumber, DatePicker, TimePicker, AutoComplete, Slider, Rate."
        code={FormControlsSource}
      >
        <FormControlsShowcase />
      </DemoBox>

      <DemoBox
        title="Field status & feedback"
        description="`validateStatus` + `hasFeedback` for manual status (success / warning / error / validating)."
        code={FieldStatusSource}
      >
        <FieldStatusForm />
      </DemoBox>

      {/* ── Dynamic / Nested ───────────────────────────────────────── */}
      <DemoBox
        title="Dynamic list (FormList)"
        description="Add / remove / reorder array items. Each row is an independent `<Field>` and validates on its own."
        code={FormListDynamicSource}
      >
        <FormListDynamic />
      </DemoBox>

      <DemoBox
        title="Nested fields"
        description="Dotted names (`address.city`) auto-store into nested objects."
        code={NestedFieldsSource}
      >
        <NestedFieldsForm />
      </DemoBox>

      {/* ── Imperative / Observed ──────────────────────────────────── */}
      <DemoBox
        title="Programmatic control"
        description="`useForm()` exposes `reset`, `setFieldsValue`, `validate`, `submit`. Share the instance via the `form` prop."
        code={ProgrammaticControlSource}
      >
        <ProgrammaticControlForm />
      </DemoBox>

      <DemoBox
        title="Live values (useWatch)"
        description="`useWatch(core, path)` re-renders only when that field changes — ideal for live previews."
        code={LiveWatchSource}
      >
        <LiveWatchForm />
      </DemoBox>

      {/* ── Styling patterns ───────────────────────────────────────── */}
      <DemoBox
        title="Login card"
        description="A real-world styled container — the form itself stays semantic, all look-and-feel lives in `.demo-login-card`."
        code={LoginCardSource}
      >
        <LoginCardForm />
      </DemoBox>

      <DemoBox
        title="Search bar"
        description="Inline layout wrapped in a styled card. The panel collects `q`, role, status, and a date filter."
        code={SearchBarSource}
      >
        <SearchBarForm />
      </DemoBox>

      <DemoBox
        title="Profile settings"
        description="Sectioned multi-column form: personal info, notifications (Switches), and avatar upload."
        code={ProfileSettingsSource}
      >
        <ProfileSettingsForm />
      </DemoBox>

      {/* ── Schema-driven ──────────────────────────────────────────── */}
      <DemoBox
        title="SchemaForm — JSON Schema"
        description="`<SchemaForm schema={...}/>` derives fields, rules and default values from a JSON Schema. Pass a Zod schema instead — it is converted via `zodToJsonSchema` before rendering."
        code={SchemaFormBasicSource}
      >
        <SchemaFormBasic />
      </DemoBox>

      <DemoBox
        title="SchemaForm — layout & size"
        description="`layout`, `size`, `disabled`, `labelCol`, `wrapperCol` are passed through to the underlying Form — no wrapper needed."
        code={SchemaFormLayoutSource}
      >
        <SchemaFormLayout />
      </DemoBox>

      <PropsTable title="Form API" data={formProps} />
      <PropsTable title="Field API" data={fieldProps} />
      <PropsTable title="FormList API" data={formListProps} />
      <PropsTable title="SchemaForm API" data={schemaFormProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Form inherits most styling from its inner Input. Override these to retune errors, spacing, or typography just for this form."
        data={formCssVars}
      />
    </ComponentDoc>
  )
}
