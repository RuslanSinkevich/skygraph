import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicInput } from './input/Basic.demo'
import BasicSource from './input/Basic.demo?raw'
import { SizesInput } from './input/Sizes.demo'
import SizesSource from './input/Sizes.demo?raw'
import { TypesInput } from './input/Types.demo'
import TypesSource from './input/Types.demo?raw'
import { StatesInput } from './input/States.demo'
import StatesSource from './input/States.demo?raw'
import { ValidationInput } from './input/Validation.demo'
import ValidationSource from './input/Validation.demo?raw'
import { ComponentTokensInput } from './input/ComponentTokens.demo'
import ComponentTokensSource from './input/ComponentTokens.demo?raw'
import { TextareaBasic } from './input/TextareaBasic.demo'
import TextareaBasicSource from './input/TextareaBasic.demo?raw'
import { TextareaCount } from './input/TextareaCount.demo'
import TextareaCountSource from './input/TextareaCount.demo?raw'
import { TextareaStates } from './input/TextareaStates.demo'
import TextareaStatesSource from './input/TextareaStates.demo?raw'
import { InFormInput } from './input/InForm.demo'
import InFormSource from './input/InForm.demo?raw'
import { UnstyledInput } from './input/Unstyled.demo'
import UnstyledSource from './input/Unstyled.demo?raw'

const inputProps: PropDef[] = [
  { name: 'value', description: 'Controlled text value', type: 'string' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'string' },
  { name: 'onChange', description: 'Fires with the next string on each keystroke', type: '(value: string) => void' },
  { name: 'onBlur', description: 'Fires when the input loses focus', type: '() => void' },
  { name: 'onFocus', description: 'Fires when the input gains focus', type: '() => void' },
  { name: 'placeholder', description: 'Placeholder when empty', type: 'string' },
  { name: 'type', description: 'Native HTML input type', type: "'text' | 'email' | 'password' | 'number'", default: "'text'" },
  { name: 'size', description: 'Height / font-size preset', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Block interaction', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner and block interaction', type: 'boolean', default: 'false' },
  { name: 'aria-invalid', description: 'Flip error styling + announce to AT', type: "boolean | 'false' | 'true' | 'grammar' | 'spelling'" },
  { name: 'aria-required', description: 'Announce required state to AT', type: "boolean | 'false' | 'true'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const textareaProps: PropDef[] = [
  { name: 'value', description: 'Controlled text value', type: 'string' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'string' },
  { name: 'onChange', description: 'Fires with the next string on each keystroke', type: '(value: string) => void' },
  { name: 'onBlur', description: 'Fires when the textarea loses focus', type: '() => void' },
  { name: 'onFocus', description: 'Fires when the textarea gains focus', type: '() => void' },
  { name: 'rows', description: 'Initial visible row count', type: 'number', default: '4' },
  { name: 'maxLength', description: 'Hard character limit (enforced, not just visual)', type: 'number' },
  { name: 'showCount', description: 'Render "length / maxLength" counter below the field', type: 'boolean', default: 'false' },
  { name: 'placeholder', description: 'Placeholder when empty', type: 'string' },
  { name: 'size', description: 'Size preset', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Block interaction', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show spinner in the top-right corner', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const inputCssVars: CssVarDef[] = [
  { name: 'sg-input-height', default: 'var(--sg-height-md)', description: 'Input height (overridden per size class)' },
  { name: 'sg-input-padding', default: 'var(--sg-padding-xs) var(--sg-padding-md)', description: 'Input padding (overridden per size class)' },
  { name: 'sg-input-font-size', default: 'var(--sg-font-size)', description: 'Input font size (overridden per size class)' },
  { name: 'sg-input-color', default: 'var(--sg-color-text)', description: 'Typed text color' },
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Background color' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Border color (also hover / focus)' },
  { name: 'sg-input-radius', default: 'var(--sg-border-radius)', description: 'Border radius' },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Focus border color' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Hover border color' },
  { name: 'sg-color-primary-bg', default: 'rgba(22, 119, 255, 0.1)', description: 'Focus ring color' },
  { name: 'sg-color-bg-disabled', default: 'rgba(0, 0, 0, 0.04)', description: 'Background when disabled' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Text color when disabled' },
  { name: 'sg-color-text-placeholder', default: 'rgba(0, 0, 0, 0.25)', description: 'Placeholder color' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Inline spinner color and textarea counter color' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Counter font size (textarea)' },
  { name: 'sg-margin-xs', default: '4px', description: 'Gap between textarea and its counter' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Color, border and box-shadow transitions' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(.4,0,.2,1)', description: 'Transition easing' },
]

export function InputDemo() {
  return (
    <ComponentDoc
      title="Input"
      description="Text input (single-line) and Textarea (multi-line) share the same sizing, focus ring and `--sg-input-*` tokens."
      whenToUse={[
        'Any free-form text entry in a form or search bar.',
        'Numeric inputs where the stepper of InputNumber would be overkill.',
        'Multi-line fields with `<Textarea>` when a single line is too cramped.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled text input with live readout." code={BasicSource}>
        <BasicInput />
      </DemoBox>

      <DemoBox title="Sizes" description="small / middle / large presets." code={SizesSource}>
        <SizesInput />
      </DemoBox>

      <DemoBox title="Types" description="Native HTML input types — text, email, password, number." code={TypesSource}>
        <TypesInput />
      </DemoBox>

      <DemoBox title="States" description="Disabled and inline loading spinner." code={StatesSource}>
        <StatesInput />
      </DemoBox>

      <DemoBox
        title="Validation"
        description="aria-invalid flips the error styling without !important."
        code={ValidationSource}
      >
        <ValidationInput />
      </DemoBox>

      <DemoBox
        title="Component tokens"
        description="Scope --sg-input-* to reshape only these inputs."
        code={ComponentTokensSource}
      >
        <ComponentTokensInput />
      </DemoBox>

      <DemoBox title="Textarea — basic" description="Multi-line sibling with shared styling." code={TextareaBasicSource}>
        <TextareaBasic />
      </DemoBox>

      <DemoBox
        title="Textarea — character count"
        description="maxLength + showCount render a live counter."
        code={TextareaCountSource}
      >
        <TextareaCount />
      </DemoBox>

      <DemoBox title="Textarea — states" description="Disabled and loading variants." code={TextareaStatesSource}>
        <TextareaStates />
      </DemoBox>

      <DemoBox title="Inside a Form" description="Input + Textarea wired up via `<Field>`." code={InFormSource}>
        <InFormInput />
      </DemoBox>

      <DemoBox title="Unstyled" description="Headless mode with your own CSS class." code={UnstyledSource}>
        <UnstyledInput />
      </DemoBox>

      <PropsTable title="Input API" data={inputProps} />
      <PropsTable title="Textarea API" data={textareaProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Input exposes its own --sg-input-* tokens (height, padding, font-size, color, bg, border, radius). They default to globals but can be scoped per input. Textarea reuses `.sg-input` so every --sg-input-* works there too."
        data={inputCssVars}
      />
    </ComponentDoc>
  )
}
