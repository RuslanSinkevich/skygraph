import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useSelectDocStrings } from './select-doc/useSelectDocStrings'

import { BasicSelect } from './select/Basic.demo'
import BasicSource from './select/Basic.demo?raw'
import { UncontrolledSelect } from './select/Uncontrolled.demo'
import UncontrolledSource from './select/Uncontrolled.demo?raw'
import { SelectSizes } from './select/Sizes.demo'
import SizesSource from './select/Sizes.demo?raw'
import { DisabledSelect } from './select/Disabled.demo'
import DisabledSource from './select/Disabled.demo?raw'
import { LoadingSelect } from './select/Loading.demo'
import LoadingSource from './select/Loading.demo?raw'
import { NumericValuesSelect } from './select/NumericValues.demo'
import NumericValuesSource from './select/NumericValues.demo?raw'
import { TokensOverrideSelect } from './select/TokensOverride.demo'
import TokensOverrideSource from './select/TokensOverride.demo?raw'
import { FloatingLabelSelect } from './select/FloatingLabel.demo'
import FloatingLabelSource from './select/FloatingLabel.demo?raw'

export function SelectDemo() {
  const t = useSelectDocStrings()

  const selectProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'string | number' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'string | number' },
      { name: 'onChange', description: t.propOnChange, type: '(value: string | number) => void' },
      { name: 'onBlur', description: t.propOnBlur, type: '() => void' },
      { name: 'options', description: t.propOptions, type: 'SelectOption[]' },
      {
        name: 'placeholder',
        description: t.propPlaceholder,
        type: 'string',
        default: "'Select...'",
      },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const optionProps = useMemo<PropDef[]>(
    () => [
      { name: 'label', description: t.propOptionLabel, type: 'string' },
      { name: 'value', description: t.propOptionValue, type: 'string | number' },
      { name: 'disabled', description: t.propOptionDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propOptionLoading, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const selectCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-input-height', default: 'var(--sg-height-md)', description: t.cssSgInputHeight },
      {
        name: 'sg-input-padding',
        default: 'var(--sg-padding-xs) var(--sg-padding-md)',
        description: t.cssSgInputPadding,
      },
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
      { name: 'sg-input-color', default: 'var(--sg-color-text)', description: t.cssSgInputColor },
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-bg',
        default: 'var(--sg-blue-1)',
        description: t.cssSgColorPrimaryBg,
      },
      {
        name: 'sg-color-bg-elevated',
        default: 'var(--sg-gray-1)',
        description: t.cssSgColorBgElevated,
      },
      {
        name: 'sg-shadow-lg',
        default: '0 6px 16px rgba(0, 0, 0, 0.12)',
        description: t.cssSgShadowLg,
      },
      {
        name: 'sg-color-text-placeholder',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextPlaceholder,
      },
      {
        name: 'sg-spin-color',
        default: 'var(--sg-color-text-tertiary)',
        description: t.cssSgSpinColor,
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
        <BasicSelect />
      </DemoBox>

      <DemoBox
        title={t.demoUncontrolledTitle}
        description={t.demoUncontrolledDesc}
        code={UncontrolledSource}
      >
        <UncontrolledSelect />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SelectSizes />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledSelect />
      </DemoBox>

      <DemoBox title={t.demoLoadingTitle} description={t.demoLoadingDesc} code={LoadingSource}>
        <LoadingSelect />
      </DemoBox>

      <DemoBox
        title={t.demoNumericTitle}
        description={t.demoNumericDesc}
        code={NumericValuesSource}
      >
        <NumericValuesSelect />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideSelect />
      </DemoBox>

      <DemoBox
        title={t.demoFloatingLabelTitle}
        description={t.demoFloatingLabelDesc}
        code={FloatingLabelSource}
      >
        <FloatingLabelSelect />
      </DemoBox>

      <PropsTable title={t.tableSelectApi} data={selectProps} />
      <PropsTable title={t.tableOptionApi} data={optionProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={selectCssVars} />
    </ComponentDoc>
  )
}
