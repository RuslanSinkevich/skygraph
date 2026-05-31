import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useInputDocStrings } from './input-doc/useInputDocStrings'

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
import { TokensOverrideInput } from './input/TokensOverride.demo'
import TokensOverrideSource from './input/TokensOverride.demo?raw'
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

export function InputDemo() {
  const t = useInputDocStrings()

  const inputProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'string' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'string' },
      { name: 'onChange', description: t.propOnChange, type: '(value: string) => void' },
      { name: 'onBlur', description: t.propOnBlur, type: '() => void' },
      { name: 'onFocus', description: t.propOnFocus, type: '() => void' },
      { name: 'placeholder', description: t.propPlaceholder, type: 'string' },
      {
        name: 'type',
        description: t.propType,
        type: "'text' | 'email' | 'password' | 'number'",
        default: "'text'",
      },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      {
        name: 'aria-invalid',
        description: t.propAriaInvalid,
        type: "boolean | 'false' | 'true' | 'grammar' | 'spelling'",
      },
      {
        name: 'aria-required',
        description: t.propAriaRequired,
        type: "boolean | 'false' | 'true'",
      },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const textareaProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propTextareaValue, type: 'string' },
      { name: 'defaultValue', description: t.propTextareaDefaultValue, type: 'string' },
      { name: 'onChange', description: t.propTextareaOnChange, type: '(value: string) => void' },
      { name: 'onBlur', description: t.propTextareaOnBlur, type: '() => void' },
      { name: 'onFocus', description: t.propTextareaOnFocus, type: '() => void' },
      { name: 'rows', description: t.propTextareaRows, type: 'number', default: '4' },
      { name: 'maxLength', description: t.propTextareaMaxLength, type: 'number' },
      {
        name: 'showCount',
        description: t.propTextareaShowCount,
        type: 'boolean',
        default: 'false',
      },
      { name: 'placeholder', description: t.propTextareaPlaceholder, type: 'string' },
      {
        name: 'size',
        description: t.propTextareaSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'disabled', description: t.propTextareaDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propTextareaLoading, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propTextareaClassName, type: 'string' },
      { name: 'style', description: t.propTextareaStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propTextareaUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const inputCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-input-height', default: 'var(--sg-height-md)', description: t.cssSgInputHeight },
      {
        name: 'sg-input-padding',
        default: 'var(--sg-padding-xs) var(--sg-padding-md)',
        description: t.cssSgInputPadding,
      },
      {
        name: 'sg-input-font-size',
        default: 'var(--sg-font-size)',
        description: t.cssSgInputFontSize,
      },
      { name: 'sg-input-color', default: 'var(--sg-color-text)', description: t.cssSgInputColor },
      { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: t.cssSgInputBg },
      {
        name: 'sg-input-border',
        default: 'var(--sg-color-border)',
        description: t.cssSgInputBorder,
      },
      {
        name: 'sg-input-radius',
        default: 'var(--sg-border-radius)',
        description: t.cssSgInputRadius,
      },
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-hover',
        default: 'var(--sg-blue-5)',
        description: t.cssSgColorPrimaryHover,
      },
      {
        name: 'sg-color-primary-bg',
        default: 'rgba(22, 119, 255, 0.1)',
        description: t.cssSgColorPrimaryBg,
      },
      {
        name: 'sg-color-bg-disabled',
        default: 'rgba(0, 0, 0, 0.04)',
        description: t.cssSgColorBgDisabled,
      },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      {
        name: 'sg-color-text-placeholder',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextPlaceholder,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextTertiary,
      },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-margin-xs', default: '4px', description: t.cssSgMarginXs },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(.4,0,.2,1)',
        description: t.cssSgTransitionTiming,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicInput />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesInput />
      </DemoBox>

      <DemoBox title={t.demoTypesTitle} description={t.demoTypesDesc} code={TypesSource}>
        <TypesInput />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesInput />
      </DemoBox>

      <DemoBox
        title={t.demoValidationTitle}
        description={t.demoValidationDesc}
        code={ValidationSource}
      >
        <ValidationInput />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={ComponentTokensSource}
      >
        <ComponentTokensInput />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideInput />
      </DemoBox>

      <DemoBox
        title={t.demoTextareaBasicTitle}
        description={t.demoTextareaBasicDesc}
        code={TextareaBasicSource}
      >
        <TextareaBasic />
      </DemoBox>

      <DemoBox
        title={t.demoTextareaCountTitle}
        description={t.demoTextareaCountDesc}
        code={TextareaCountSource}
      >
        <TextareaCount />
      </DemoBox>

      <DemoBox
        title={t.demoTextareaStatesTitle}
        description={t.demoTextareaStatesDesc}
        code={TextareaStatesSource}
      >
        <TextareaStates />
      </DemoBox>

      <DemoBox title={t.demoInFormTitle} description={t.demoInFormDesc} code={InFormSource}>
        <InFormInput />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledInput />
      </DemoBox>

      <PropsTable title={t.tableInputApi} data={inputProps} />
      <PropsTable title={t.tableTextareaApi} data={textareaProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={inputCssVars} />
    </ComponentDoc>
  )
}
